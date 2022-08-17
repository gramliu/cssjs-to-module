import { writeFileSync } from "fs";
import util from "util";

/**
 * Inspect the properties of `obj` up to a max specified depth
 */
export function inspect(obj: any, depth: number = 3) {
  return util.inspect(obj, true, depth, false);
}

/**
 * Dump a string to a temporary file
 */
export function dumpTemp(dump: string, name: string = "dump.txt") {
  writeFileSync(`tmp/${name}`, dump);
}
