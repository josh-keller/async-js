const LETTERS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

const model = {
  findAll({ offset, limit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(LETTERS.slice(offset, offset + limit)), 200)
    });
  }
}

function doLongRequestForBatch(batch) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const upper = batch.map(letter => letter.toUpperCase());
        console.log("Processed batch: ", upper);
        resolve(200);
      },
      1000
    )
  });
}

async function batchRequests(options) {
  let query = { offset: 0, limit: options.limit };
  let batch = [];
  let promises = [];

  do {
    batch = await model.findAll(query);
    query.offset += options.limit;

    if (batch.length) {
      console.log("Making request for: ", batch);
      const promise = doLongRequestForBatch(batch).then(() => {
        // Once complete, pop this promise from our array
        // so that we know we can add another batch in its place
        for (let i = 0; i < promises.length; i++) {
          if (promises[i] === promise) {
            promises.splice(i, 1);
            break;
          }
        }
      });
      promises.push(promise);

      // Once we hit our concurrency limit, wait for at least one promise to
      // resolve before continuing to batch off requests
      if (promises.length >= options.concurrentBatches) {
        await Promise.race(promises);
      }
    }
  } while (batch.length);

  // Wait for remaining batches to finish
  return Promise.all(promises);
}

batchRequests({ limit: 3, concurrentBatches: 5 });

