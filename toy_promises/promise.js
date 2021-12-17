function promise_maker(valueMaker){
  const onResolve = [];    // list of callbacks to execute on resolve
  const onReject = [];     // list of callbacks to execute on reject
  let status = 'pending';  // will be 'fulfilled' or 'rejected'
  let value;
  let error;

  function resolve(resolvedVal) {
    // change status
    status = 'resolved';
    value = resolvedVal;
    onReject.splice(0);

    // pass the value to each callback in the onResolve array
    // and execute that callback
    onResolve.forEach(callback => callback(value));
  }

  function reject(rejectErr) {
    status = 'rejected';
    error = rejectErr;
    onResolve.splice(0);

    onReject.forEach(callback => callback(rejectErr));
  }

  valueMaker(resolve, reject);

  return {
    then(callback) {
      if (status === 'resolved') {
        callback(value);
      } else if (status = 'pending') {
        onResolve.push(callback);
      }
    },

    // Named 'uhoh' to not conflict with the catch keyword
    uhoh(callback) {
      if (status === 'rejected') {
        callback(error);
      } else if (status === 'pending') {
        onReject.push(callback);
      }
    }
  }
}

// Assigns a promise to resolve in a random number of seconds (0 - 4)
// Assigns it to reject in 2.5 seconds
let prom = promise_maker( (resolve, reject) => {
  const seconds = Math.floor(Math.random() * 4);

  setTimeout(() => {
    reject('Took too long');
  }, 2500);

  setTimeout(() => {
    resolve('resolved');
  }, seconds * 1000);
});

prom.then(value => console.log(value));
prom.uhoh(error => console.log(error));
