import * as ts from "typescript";

/**
 * Returns the enum name of a `ts.SyntaxKind` value
 */
export default function syntaxKindToString(syntaxKind: ts.SyntaxKind): string {
  return ts.SyntaxKind[syntaxKind];
}
