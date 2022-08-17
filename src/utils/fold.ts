/**
 * fold-left utility
 */
export function foldl<T, U>(
  combine: (current: U, incoming: T) => U,
  start: U,
  stream: T[]
): U {
  let output = start;
  for (const element of stream) {
    output = combine(output, element);
  }
  return output;
}
