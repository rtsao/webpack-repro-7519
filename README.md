# Bug repro for webpack/webpack/issues/7519

## Reproduction steps

```
yarn install
yarn webpack
```

### Expected

`unreachable` should not be bundled

### Actual

`unreachable` is bundled

## Code

```js
// index.js
import unreachable from "./unreachable.js";

function something() {
  return Math.random();
}

function app() {
  something() && false && unreachable();
}

app();
```

```js
// unreachable.js
module.exports = function unreachable() {
  console.log("Unreachable function should not be bundled!");
};
```

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  optimization: {
    usedExports: true,
  },
};
```
