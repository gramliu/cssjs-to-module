import { writeFileSync } from "fs";
import { Project, SourceFile } from "ts-morph";
import util from "util";
import extractStyles from "./transformations/extractStyles";
import removeImports from "./transformations/removeImports";

const inspect = (obj: any) => util.inspect(obj, true, 3, false);

function dumpTemp(dump: string, name: string = "dump.txt") {
  writeFileSync(`tmp/${name}`, dump);
}

function saveOutput(sourceFile: SourceFile) {
  const baseName = sourceFile.getBaseName();
  sourceFile.copyImmediatelySync(`../output/${baseName}`, {
    overwrite: true,
  });
}

function transformSource(sourceFile: SourceFile) {
  removeImports(sourceFile);
  extractStyles(sourceFile);
}

function main(fileNames: string[]) {
  const project = new Project();
  fileNames.forEach((fn) => project.addSourceFileAtPath(fn));

  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    transformSource(sourceFile);
    // saveOutput(sourceFile);
  }
}

main(["input/AdminDialog.tsx"]);
// main(["input/SponsorCreationForm.tsx"]);
