// Here is an example of how we can use a runner function to pass values back
// and forth to a generator. You would never actually need to do this in
// synchronous code, but it is a good previous step to understand how the
// asynchronous version works.

function yelling(str) {
  return str.toUpperCase();
}

function withExcitement(str) {
  return str + "!!!";
}

function run(generator, ...args) {
  let iterator = generator(...args);

  let nextReturn = iterator.next();

  while (!nextReturn.done) {
    let output = nextReturn.value;
    nextReturn = iterator.next(output);
  }
}

function *soExcited(input) {
  let excited = yield withExcitement(input);
  let loudAndExcited = yield yelling(excited);
  console.log(loudAndExcited);
}

run(soExcited, "Hi");  // output -> "HI!!!"
