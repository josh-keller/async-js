// The previous example will not work if you want the function to return a
// value. The run() function below solves this.

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

  let resolveReturnPromise;
  let finalReturnPromise = new Promise((resolve, reject) => {
    resolveReturnPromise = function (returnVal) {
      resolve(returnVal);
    }
  });

  helper(iterator.next());

  function helper(nextReturn) {
    if (nextReturn.done) {
      resolveReturnPromise(nextReturn.value);
    } else {
      let promise = nextReturn.value;
      promise
        .then(output => {
          helper(iterator.next(output))
        });
    }
  }

  return finalReturnPromise;
}

function *soExcited(input) {
  let excited = yield (excitrr(input));
  let loudAndExcited = yield yellify(excited);
  return loudAndExcited;
}

run(soExcited, "Hi").then(val => console.log(val));
