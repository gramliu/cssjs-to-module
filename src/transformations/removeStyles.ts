import { SourceFile } from "ts-morph";

/**
 * Extract the CSS-in-JSS stylesheet into a mapping
 */
export default function removeStyles(srcFile: SourceFile) {
  // Retrieve styles object literal
  const useStyles = srcFile.getVariableDeclaration("useStyles");
  useStyles.remove();
}
