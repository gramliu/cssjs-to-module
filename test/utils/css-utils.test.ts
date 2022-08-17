import assert from "assert";
import {
  jsPropertyToCss,
  serializeClassStyle,
  serializeStylesheet,
} from "../../src/utils/css-utils";
import type {
  ClassStyle,
  Stylesheet,
} from "../../src/transformations/extractStyles";

function testJsPropertyToCss() {
  assert(jsPropertyToCss("justifyContent") === "justify-content");
}

function testSerializeClassStyle() {
  const classStyle: ClassStyle = {
    "justify-content": "space-between",
    width: 100,
    height: "100%",
  };
  const reference = `\
justify-content: space-between;
width: 100;
height: 100%;`;
  const serialized = serializeClassStyle(classStyle);
  assert(reference === serialized);
}

function testSerializeSpreadsheet() {
  const classStyle: ClassStyle = {
    "justify-content": "space-between",
    width: 100,
    height: "100%",
  };

  const stylesheet: Stylesheet = {
    tabs: classStyle,
    tabPage: classStyle,
  };

  const ref = `\
.tabs {
  justify-content: space-between;
  width: 100;
  height: 100%;
}

.tabPage {
  justify-content: space-between;
  width: 100;
  height: 100%;
}`;

  const serialized = serializeStylesheet(stylesheet);
  assert(serialized == ref);
}

testJsPropertyToCss();
testSerializeClassStyle();
testSerializeSpreadsheet();
console.log("Success");
