import { Project, SourceFile } from "ts-morph";
import addModuleImport from "./transformations/addModuleImport";
import extractStyles from "./transformations/extractStyles";
import removeImports from "./transformations/removeImports";
import removeStyles from "./transformations/removeStyles";
import replaceClasses from "./transformations/replaceClasses";
import { saveOutput } from "./utils/io";

function transformSource(sourceFile: SourceFile) {
  removeImports(sourceFile);
  removeStyles(sourceFile);

  replaceClasses(sourceFile);
  addModuleImport(sourceFile);
}

function main(fileNames: string[]) {
  const project = new Project();
  fileNames.forEach((fn) => project.addSourceFileAtPath(fn));

  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    const stylesheet = extractStyles(sourceFile);
    transformSource(sourceFile);
    saveOutput(sourceFile, stylesheet);
  }
}

main(["input/AdminDialog.tsx"]);
// main(["input/SponsorCreationForm.tsx"]);
