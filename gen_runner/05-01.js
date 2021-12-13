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

run(soExcited, "Hi");
// run(soExcited, "There!");
// run(soExcited, "FRIEND!");
