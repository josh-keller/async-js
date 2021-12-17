function myPromiseAll(promises) {
  const resolutions = new Array(promises.length).fill(false);
  const results = new Array(promises.length);

  return new Promise((resolve, reject) => {
    for (let idx = 0; idx < promises.length; idx += 1) {

      promises[idx].then(result => {
        resolutions[idx] = true;
        results[idx] = result;
        if (resolutions.every(res => res)) {
          resolve(results);
        }
      },

      error => {
        reject(error);
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

myPromiseAll([a, b, c])
  .then(result => console.log(result),
    error => console.log(error));
