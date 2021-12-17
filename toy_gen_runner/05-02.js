// Here we have the asynchronous version of a gen runner. Note that the while loop is replaced by a function that returns a promise. When the promise resolves, the function is called recursive with the next value.
//
// Lots of console.log statements so you can see how the execution flows.

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
  console.log("run() called")
  let iterator = generatpassor(...args);

  console.log("calling first next() on iterator...")
  let itNext = iterator.next()
  console.log("calling helper from run()")
  helper(itNext);

  function helper(nextReturn) {
    console.log("helper executing with arg: ", nextReturn)
    if (!nextReturn.done) {
      let promise = nextReturn.value;
      console.log("waiting for promise to resolve...")
      promise
        .then(output => {
          console.log("Helper promise resolved: ", output);
          console.log("Calling helper again...")
          helper(iterator.next(output))
        });
    } else {
      console.log("iterator is done!")
    }
  }
}

function *soExcited(input) {
  console.log("soExcited: calling excitrr with input: ", input)
  let excited = yield excitrr(input);
  console.log("soExcited: calling yellify with input: ", excited)
  let loudAndExcited = yield yellify(excited);
  console.log("soExcited: yellify returned with: ", loudAndExcited)
}

run(soExcited, "Hi");
