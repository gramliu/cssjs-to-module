import { SourceFile } from "ts-morph";

/**
 * Add an import to the CSS module
 */
export default function addModuleImport(srcFile: SourceFile) {
  srcFile.addImportDeclaration({
    namespaceImport: "styles",
    moduleSpecifier: "index.module.css",
  });
}
