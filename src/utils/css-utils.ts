import { ClassStyle, Stylesheet } from "src/transformations/extractStyles";

/**
 * Convert a camel-case CSS-in-JS property to the original CSS property
 */
export function jsPropertyToCss(property: string): string {
  // TODO: replace with regex
  const output = [];
  for (const char of property) {
    if (char.match("[A-Z]")) {
      output.push("-");
      output.push(char.toLowerCase());
    } else {
      output.push(char);
    }
  }
  return output.join("");
}

/**
 * Convert a classStyle into a string.
 * Optionally, specify the amount of indentation and whether or not to use spaces
 */
export function serializeClassStyle(
  classStyle: ClassStyle,
  indent: number = 0,
  useSpaces: boolean = true
): string {
  const output = [];
  for (const property in classStyle) {
    const value = classStyle[property];
    output.push(`${property}: ${value};`);
  }
  const indentation = Array(indent)
    .fill(useSpaces ? "  " : "\t")
    .join("");
  if (output.length > 0) {
    output[0] = indentation + output[0];
  }
  return output.join(`\n${indentation}`);
}

/**
 * Convert a stylesheet into a string
 */
export function serializeStylesheet(stylesheet: Stylesheet): string {
  const output = [];
  for (const className in stylesheet) {
    const classStyle = stylesheet[className];
    const classStyleStr = serializeClassStyle(classStyle, 1);
    const styleStr = `.${className} {
${classStyleStr}
}`;
    output.push(styleStr);
  }
  return output.join("\n\n");
}
