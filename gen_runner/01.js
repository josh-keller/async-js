function *gen() {
  yield "hi"
  yield "there"
}

const it = gen();
console.log(it.next().value);
console.log("taking a break");
console.log(it.next().value);
