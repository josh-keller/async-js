const asyncSource = {
  async *[Symbol.asyncIterator]() {
    console.log(await new Promise(res => setTimeout(res, 1000, 1)));
    console.log(await new Promise(res => setTimeout(res, 2000, 2)));
    yield 42;
  }
}

const ait = asyncSource[Symbol.asyncIterator]();

ait.next().then(({value}) => console.log(value));

// line 9 creates the iterator
// line 11 -> the `next()` runs the generator to the first `yield`

// 1
// 2
// 42
