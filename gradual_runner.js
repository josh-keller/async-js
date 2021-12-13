// function *steps() {
//   const v = (yield 5);
//   console.log(`From steps: ${v}`)
//   return;
// }

// const it = steps();

// console.log(it.next().value);
// console.log(it.next("Passed back in"));

function mockFetch(url) {
  return `Data from ${url}`
}


function *requestYielder() {
  const urls = ["http://example.com/1", "http://example.com/2"];
  const responses = [];

  for (let i = 0; i < urls.length; i++) {
    responses.push(yield urls[i]);
  }

  return responses;
}

const requester = requestYielder();
let nextRequest = requester.next();

while (!nextRequest.done) {
  let response = mockFetch(nextRequest.value);
  console.log(response);
  nextRequest = requester.next(response);
}

console.log(nextRequest)
