import { Node, SyntaxKind } from "ts-morph";
import * as ts from "typescript";
import { foldl } from "./fold";

/**
 * Print the `SyntaxKind` names of the specified `node`'s children
 */
export function printChildrenKind<T extends ts.Node>(node: Node) {
  node.getChildren().forEach((node) => console.log(node.getKindName()));
}

/**
 * Extract a nested node under the root specified by the provided path
 */
export function extractNestedNode(root: Node, syntaxKindPath: SyntaxKind[]) {
  return foldl(
    (node, syntaxKind) => node.getFirstChildByKind(syntaxKind),
    root,
    syntaxKindPath
  );
}

/**
 * Extract a value from a nested StringLiteral or NumericLiteral
 */
export function getLiteralChildValue(node: Node): string | number {
  const literal =
    node.getFirstChildByKind(SyntaxKind.StringLiteral) ??
    node.getFirstChildByKind(SyntaxKind.NumericLiteral);
  if (literal == null) {
    throw new Error(
      `Could not find child of kind StringLiteral or NumericLiteral under node: ${node.getFullText()}`
    );
  }
  return literal.getLiteralValue();
}
