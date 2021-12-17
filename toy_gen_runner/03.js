// Same functionality, but using asynchronous calls that return promises,
// handled with promise chaining.

function yellify(str) {
  return new Promise(resolve => {
    setTimeout(() => resolve(str.toUpperCase()), 200);
  });
}

function excitrr(str) {
  return new Promise(resolve => {
    setTimeout(() => resolve(str + "!!!"), 200);
  });
}

function soExcited(input) {
  return yellify(input)
    .then(output => excitrr(output))
    .then(output => console.log(output));
}

soExcited("Hi");  // output -> "HI!!!"
