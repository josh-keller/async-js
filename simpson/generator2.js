function *main(max = 8) {
  for (let i = 0; i <= max; i = i + 2) {
    yield i;
  }
}

console.log([...main()]);

for (let v of main(14)) {
  console.log(v);
}
