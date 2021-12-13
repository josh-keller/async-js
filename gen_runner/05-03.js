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

soExcited("Hi");
soExcited("There!");
soExcited("FRIEND!");


