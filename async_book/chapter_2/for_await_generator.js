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

const iterator = main();

(async function() {
  for await (let item of iterator) {
    console.log(item);
  }
})()
