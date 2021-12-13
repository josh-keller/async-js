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

soExcited("Hi");
soExcited("There!");
soExcited("FRIEND!");
