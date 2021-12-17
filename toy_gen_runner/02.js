// Synchronous code

function yelling(str) {
  return str.toUpperCase();
}

function withExcitement(str) {
  return str + "!!!";
}

function soExcited(input) {
  let excited = withExcitement(input);
  let loudAndExcited = yelling(excited);
  console.log(loudAndExcited);
}

soExcited("Hi"); // output -> HI!!!
