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

function remove(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
      break;
    }
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
      Math.floor(Math.random() * 1000 + 400)
    )
  });
}

async function serialRequests(options) {
  let query = { offset: 0, limit: options.limit };
  let batch = await model.findAll(query);

  while (batch.length) {
    query.offset += options.limit;

    console.log("Making request for: ", batch);
    await doLongRequestForBatch(batch);

    batch = await model.findAll(query);
  }

  return Promise.resolve('done');
}

serialRequests({ limit: 4 });
