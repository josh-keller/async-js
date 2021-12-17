// This example shows what we want to be able to do with asynchronous code

function yellify(str) {
  return new Promise(resolve => {
    setTimeout(() => resolve(str.toUpperCase()), 500);
  });
}

function excitrr(str) {
  return new Promise(resolve => {
    setTimeout(() => resolve(str + "!!!"), 500);
  });
}

// This syntax is much more readable than promise chaining.
// How can we get it while still using asynchronous functions?
function soExcited(input) {
  let excited = yellify(input);
  let loudAndExcited = excitrr(excited);
  console.log(loudAndExcited);
}

soExcited("Hi"); // output -> Promise { <pending> }
