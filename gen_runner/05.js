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

function *soExcited(input) {
  let excited = yield yellify(input);
  let loudAndExcited = yield excitrr(excited);
  console.log(loudAndExcited);
}

function run(generator) {
  let iterator = generator();

  function helper(iteratorReturn) {
    // 

  }
}

soExcited("Hi");
soExcited("There!");
soExcited("FRIEND!");
