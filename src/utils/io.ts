import { Stylesheet } from "src/transformations/extractStyles";
import { SourceFile } from "ts-morph";

/**
 * Save a modified source file to the output directory
 */
export function saveOutput(sourceFile: SourceFile, styles: Stylesheet) {
  const baseName = sourceFile.getBaseName();
  sourceFile.copyImmediatelySync(`../output/${baseName}`, {
    overwrite: true,
  });
}
