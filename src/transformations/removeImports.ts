import { ImportDeclaration, SourceFile } from "ts-morph";

const CORE_PACKAGE = "@material-ui/core";
const STYLES_PACKAGE = "@material-ui/styles";
const TARGET_NAMED_IMPORT = "makeStyles";

/**
 * Remove makeStyles and useTheme imports
 */
export default function removeImports(srcFile: SourceFile) {
  const coreMatch = (decl: ImportDeclaration) =>
    decl.getModuleSpecifierValue() === CORE_PACKAGE;
  const coreDeclaration = srcFile.getImportDeclaration(coreMatch);
  if (coreDeclaration != null) {
    const namedCoreImports = coreDeclaration.getNamedImports();
    const makeStylesImport = namedCoreImports.find(
      (namedImport) => namedImport.getText() === TARGET_NAMED_IMPORT
    );
    if (makeStylesImport != null) makeStylesImport.remove();
  }

  const styleMatch = (decl: ImportDeclaration) =>
    decl.getModuleSpecifierValue() === STYLES_PACKAGE;
  const styleDeclaration = srcFile.getImportDeclaration(styleMatch);
  if (styleDeclaration != null) styleDeclaration.remove();
}
