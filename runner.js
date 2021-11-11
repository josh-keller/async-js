// Mock fetch calls
function fetchCurrentUser() {
  return new Promise(resolve => setTimeout(() => resolve({ id: 123 }), 500));
}

function fetchArchivedOrders(userId) {
  return new Promise(resolve => setTimeout(() => {
    resolve([{ prod_id: 1, qty: 4 }, { prod_id: 4, qty: 2 } ]);
  }, 500));
}

function fetchCurrentOrders(userId) {
  return new Promise(resolve => setTimeout(() => {
    resolve([{ prod_id: 3, qty: 1 }, { prod_id: 6, qty: 5 } ]);
  }, 200));
}

// This is a very, very primitive generator runner.
// It takes a generator and extracts values one at a time, using next()
// It then feed the value back in, by passing at as an argument to the
// subsequent next() call. We need the helper() function because we can't
// loop synchronously. We don't know when we'll be done and we need to send
// the resulting value back to the iterator in case it needs the value for
// the next iteration step.

function runner(generator) {
  const iterator = generator();

  function helper(nextItem) {
    if (!nextItem.done) {
      nextItem.value
        .then( result => helper(iterator.next(result)) );
    }
  }

  helper(iterator.next());
}

// Here is our generator. Notice that 'yield' here acts very much like 'await'.
// All of our fetch... methods return a promise which we yield out as the next()
// value. The generator suspends execution at this point and waits for another
// next() call. It uses the value passed as an argument to next() to replace the
// entire 'yield' expression. This is why we can directly assign the value, not
// just the promise. The asynchrony has been abstracted away to the runner()
// function.
// Code below based on an exmample in Kyle Simpson's talk.

function *main() {
  var user = (yield fetchCurrentUser()); 

  console.log(user);

  var [ archivedOrders, currentOrders ] = 
    yield Promise.all([
      fetchArchivedOrders( user.id ),
      fetchCurrentOrders( user.id )
    ]);

  console.log(archivedOrders, currentOrders);
}

runner(main);
