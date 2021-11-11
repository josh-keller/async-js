function *main() {
  var x = 1 + (yield 4);
  var y = 2 + (yield 5);
  var z = 3 + (yield 6);
  return x + y + z;
}

var it = main();

console.log(it.next());
console.log(it.next(10));
console.log(it.next(20));
console.log(it.next(30));
