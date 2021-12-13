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

function run(generator, ...args) {
  let iterator = generator(...args);

  helper(iterator.next());

  function helper(nextReturn) {
    if (!nextReturn.done) {
      let promise = nextReturn.value;
      promise
        .then(output => {
          console.log(output);
          helper(iterator.next(output))
        });
    }
  }
}

function *soExcited(input) {
  let excited = yield excitrr(input);
  let loudAndExcited = yield yellify(excited);
  console.log(loudAndExcited);
}

run(soExcited, "Hi");
// run(soExcited, "There!");
// run(soExcited, "FRIEND!");
