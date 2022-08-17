import assert from "assert";
import { jsPropertyToCss } from "../../src/utils/css-utils";

function testJsPropertyToCss() {
  assert(jsPropertyToCss("justifyContent") === "justify-content");
}

testJsPropertyToCss();
console.log("Success");
