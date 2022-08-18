import { rmdirSync, rmSync, writeFileSync } from "fs";
import { Stylesheet } from "src/transformations/extractStyles";
import { SourceFile } from "ts-morph";
import { serializeStylesheet } from "./css-utils";

/**
 * Save a modified source file and its corresponding stylesheet
 * to the output directory
 */
export function saveOutput(sourceFile: SourceFile, styles?: Stylesheet) {
  // rmSync("output", {
  //   recursive: true,
  //   force: true,
  // });
  const baseName = sourceFile.getBaseNameWithoutExtension();
  const fileName = sourceFile.getBaseName();
  sourceFile.copyImmediatelySync(`../output/${baseName}/index.tsx`, {
    overwrite: true,
  });
  if (styles != null) {
    const serialized = serializeStylesheet(styles);
    writeFileSync(`output/${baseName}/index.module.css`, serialized);
  }
}
