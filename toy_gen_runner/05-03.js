// Comparing syntax between async/await and gen runner

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

async function soExcited(input) {
  let excited = await (excitrr(input));
  let loudAndExcited = await yellify(excited);
  console.log(loudAndExcited);
}

// This function will not run without the gen runner, but see the similarity in
// syntax between using a gen runner and async/await:
function *soExcitedGen(input) {
  let excited = yield excitrr(input);
  let loudAndExcited = yield yellify(excited);
  console.log(loudAndExcited);
}

// And here is the difference in calling the function:
// run(soExcited, "Hi");
// vs:
soExcited("Hi");


