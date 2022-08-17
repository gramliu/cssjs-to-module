import { Project, SourceFile } from "ts-morph";
import extractStyles from "./transformations/extractStyles";
import removeImports from "./transformations/removeImports";

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
