function *main() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

var it = main();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
