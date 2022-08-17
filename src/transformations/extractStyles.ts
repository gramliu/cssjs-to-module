import { SourceFile, SyntaxKind } from "ts-morph";
import { extractNestedNode, getLiteralChildValue } from "../utils/ast-utils";
import { jsPropertyToCss } from "../utils/css-utils";

type ClassStyle = Record<string, string | number>;
type Stylesheet = Record<string, ClassStyle>;

/**
 * Remove useStyles declaration and extract styles to separate css file
 */
export default function extractStyles(srcFile: SourceFile) {
  // Retrieve styles object literal
  const useStyles = srcFile.getVariableDeclaration("useStyles");
  const stylesLiteral = extractNestedNode(useStyles, [
    SyntaxKind.CallExpression,
    SyntaxKind.SyntaxList,
    SyntaxKind.ArrowFunction,
    SyntaxKind.ParenthesizedExpression,
    SyntaxKind.ObjectLiteralExpression,
    SyntaxKind.SyntaxList,
  ]);
  const styles = stylesLiteral.getChildrenOfKind(SyntaxKind.PropertyAssignment);

  // Extract styles and add to stylesheet
  const stylesheet: Stylesheet = {};
  for (const style of styles) {
    const identifier = style
      .getFirstChildByKind(SyntaxKind.Identifier)
      .getText();
    const properties = extractNestedNode(style, [
      SyntaxKind.ObjectLiteralExpression,
      SyntaxKind.SyntaxList,
    ]).getChildrenOfKind(SyntaxKind.PropertyAssignment);

    const classStyle: ClassStyle = {};
    properties.forEach((prop) => {
      const identifier = jsPropertyToCss(prop.getName());
      const value = getLiteralChildValue(prop);
      classStyle[identifier] = value;
    });
    stylesheet[identifier] = classStyle;
  }

  console.log(stylesheet);

  // Remove style declaration
  useStyles.remove();
}
