function myPromiseAllSettled(promises) {
  if (promises.length === 0) return Promise.resolve([]);

  const results = new Array(promises.length).fill(undefined);

  return new Promise((resolve, reject) => {
    for (let idx = 0; idx < promises.length; idx += 1) {
      promises[idx].then(value => {
        results[idx] = { status: "fulfilled", value };
        if (results.every(prom => prom)) {
          resolve(results);
        }
      }, error => {
        results[idx] = { status: "rejected", reason: error }
        if (results.every(prom => prom)) {
          resolve(results);
        }
      })
    }
  });
}

const a = new Promise((resolve, reject) => {
  setTimeout(() => resolve('a'), 2000);
});

const b = new Promise((resolve, reject) => {
  setTimeout(() => reject('b'), 1000);
});

const c = new Promise((resolve, reject) => {
  setTimeout(() => resolve('c'), 3000);
});

myPromiseAllSettled([a, b, c])
  .then(result => console.log(result),
    error => console.log(error));
