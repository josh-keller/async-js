function call() {
  return new Promise(resolve => setTimeout(() => resolve('answer'), 3000));
}

function *main() {
  var pr = call();
  var v = yield pr;
  console.log(v);
}

var it = main();

var pr = it.next().value;

pr.then(function(v) {
  it.next(v);
});



