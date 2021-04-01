import unreachable from "./unreachable.js";

function something() {
  return Math.random();
}

function app() {
  something() && false && unreachable();
}

app();
