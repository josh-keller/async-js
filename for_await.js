const srcArr = [
  () => new Promise(resolve => setTimeout(() => resolve('a'), 2000)),
  () => new Promise(resolve => setTimeout(() => resolve('b'), 0)),
  () => new Promise(resolve => setTimeout(() => resolve('c'), 1000)),
];

srcArr[Symbol.asyncIterator] = function() {
  let i = 0;
  return {
    async next() {
      if (i === srcArr.length) {
        return {
          done: true
        };
      }
      const func = srcArr[i++];
      return {
        value: await func(),
        done: false
      };
    }
  };
};

(async function() {
  for await (const val of srcArr) {
    console.log(val);
  }
})();


// Output:
// a
// b
// c
