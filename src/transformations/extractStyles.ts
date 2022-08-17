import { SourceFile, SyntaxKind } from "ts-morph";
import { extractNestedNode, getLiteralChildValue } from "../utils/ast-utils";
import { jsPropertyToCss } from "../utils/css-utils";

export type ClassStyle = Record<string, string | number>;
export type Stylesheet = Record<string, ClassStyle>;

/**
 * Extract the CSS-in-JSS stylesheet into a mapping
 */
export default function extractStyles(srcFile: SourceFile): Stylesheet {
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

  return stylesheet;
}
