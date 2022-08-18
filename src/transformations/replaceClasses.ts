import {
  JsxAttribute,
  JsxExpression,
  Node,
  SourceFile,
  StringLiteral,
  SyntaxKind,
} from "ts-morph";
import { PropertyAccessExpression, TemplateExpression } from "ts-morph";
import * as ts from "typescript";
import { extractNestedNode, printChildrenKind } from "../utils/ast-utils";

const TARGET_DECLARATION = "classes";
const DESTINATION_DECLARATION = "styles";

/**
 * Remove classes declaration in component body
 */
function removeClassesDeclaration(componentBody: Node<ts.Node>) {
  const vars = componentBody.getChildrenOfKind(SyntaxKind.VariableStatement);
  for (const stmt of vars) {
    const declarations = stmt.getDeclarations();
    if (
      declarations.length > 0 &&
      declarations[0].getName() === TARGET_DECLARATION
    ) {
      declarations[0].remove();
    }
  }
}

/**
 * Replace references to classes with references to styles
 */
function replaceClassReferences(componentBody: Node<ts.Node>) {
  const classReferences = componentBody.getDescendantsOfKind(
    SyntaxKind.PropertyAccessExpression
  );
  for (const reference of classReferences) {
    if (reference.getExpression().getText() === TARGET_DECLARATION) {
      reference.setExpression(DESTINATION_DECLARATION);
    }
  }
  // const jsxDescendants = componentBody.getDescendantsOfKind(
  //   SyntaxKind.JsxElement
  // );
  // for (const jsx of jsxDescendants) {
  //   const openingElement = jsx.getOpeningElement();
  //   const classNameAttr = openingElement.getAttribute("className");
  //   if (classNameAttr != null && classNameAttr instanceof JsxAttribute) {
  //     // Replace className prop references to the classes object
  //     const classNameInitializer = classNameAttr.getInitializer();
  //     if (classNameInitializer instanceof JsxExpression) {
  //       // Replace JSX call references
  //       const className =
  //         classNameInitializer.getFirstChildByKind(
  //           SyntaxKind.PropertyAccessExpression
  //         ) ??
  //         extractNestedNode(classNameInitializer, [
  //           SyntaxKind.TemplateExpression,
  //           SyntaxKind.SyntaxList,
  //           SyntaxKind.TemplateSpan,
  //         ]);

  //       // Replace references to classes
  //       const newClass = className.getText().replace("classes.", "styles.");

  //       if (className instanceof PropertyAccessExpression) {
  //         // of the form: className={classes.cssClass}
  //         className.setExpression(newClass);
  //       } else {
  //         const classReferences = className.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression)
  //         printChildrenKind(className);
  //         // for (const child of className.getChildrenOfKind(
  //         //   SyntaxKind.SyntaxList
  //         // )) {
  //         //   console.log(child.getText());
  //         //   console.log("====");
  //         // }
  //         // printChildrenKind(className.getChildAtIndex(1));
  //         // console.log(classNameValue.getFullText());
  //         // // of the form: className={`${classes.cssClass}`}
  //         // classNameValue.setLiteralValue(newClass);
  //       }
  //     }
  //   }
  // }
}

/**
 * Replace classes with styles
 */
export default function replaceClasses(srcFile: SourceFile) {
  // TODO: figure out how to identify class component definitions
  const componentBody = extractNestedNode(srcFile, [
    SyntaxKind.SyntaxList,
    SyntaxKind.VariableStatement,
    SyntaxKind.VariableDeclarationList,
    SyntaxKind.SyntaxList,
    SyntaxKind.VariableDeclaration,
    SyntaxKind.ArrowFunction,
    SyntaxKind.Block,
    SyntaxKind.SyntaxList,
  ]);
  removeClassesDeclaration(componentBody);
  replaceClassReferences(componentBody);
}
