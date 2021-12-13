// Example from: https://andreasimonecosta.dev/posts/javascript-iterators-and-generators-asynchronous-generators/

// What will it log?
const asyncSource = {
  async *[Symbol.asyncIterator]() {
    console.log(await new Promise(res => setTimeout(res, 1000, 1)));
    console.log(await new Promise(res => setTimeout(res, 2000, 2)));
    yield 42;
  }
}

const ait = asyncSource[Symbol.asyncIterator]();

ait.next().then(({value}) => console.log(value));
