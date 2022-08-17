import assert from "assert";
import { foldl } from "../../src/utils/fold";

function op_plus(a: any, b: any): any {
  return a + b;
}

function testFoldLeft() {
  const sum = foldl(op_plus, 0, [1, 3, 5]);
  assert(sum === 9);

  const concat = foldl(op_plus, "", ["hello", "world", "foo", "bar"]);
  assert(concat === "helloworldfoobar");
}

testFoldLeft();
console.log("Success");
