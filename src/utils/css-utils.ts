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
