import { SourceFile, SyntaxKind } from "ts-morph";

const TARGET_INITIALIZER = "useStyles()";
const TARGET_DECLARATION = "classes";
const DESTINATION_DECLARATION = "styles";

/**
 * Remove classes declaration in component body
 */
function removeClassesDeclaration(sourceFile: SourceFile) {
  const vars = sourceFile.getDescendantsOfKind(SyntaxKind.VariableStatement);
  for (const stmt of vars) {
    const declarations = stmt.getDeclarations();
    if (
      declarations.length > 0 &&
      declarations[0].getStructure().initializer === TARGET_INITIALIZER
    ) {
      declarations[0].remove();
    }
  }
}

/**
 * Replace references to classes with references to styles
 */
function replaceClassReferences(sourceFile: SourceFile) {
  const classReferences = sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertyAccessExpression
  );
  for (const reference of classReferences) {
    if (reference.getExpression().getText() === TARGET_DECLARATION) {
      reference.setExpression(DESTINATION_DECLARATION);
    }
  }
}

/**
 * Replace classes with styles
 */
export default function replaceClasses(sourceFile: SourceFile) {
  removeClassesDeclaration(sourceFile);
  replaceClassReferences(sourceFile);
}
