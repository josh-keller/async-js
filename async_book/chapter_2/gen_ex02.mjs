import fetch from 'node-fetch';

const srcArr = [
  'https://eloux.com/async_js/examples/1.json',
  'https://eloux.com/async_js/examples/2.json',
  'https://thisisnotarealwebsiteihope.com', // Error
  'https://eloux.com/async_js/examples/3.json',
];

 srcArr[Symbol.asyncIterator] = async function*() {
   for (const url of this) {
     try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error('Unable to retrieve URL: ' + response.status);
       }
       yield response.json();
     } catch(e) {
       console.error(e.message)
     }
   }
 };

const asyncIterator = srcArr[Symbol.asyncIterator]();

// asyncIterator.next().then(({value}) => console.log(value));

(async function() {
  for await (const data of asyncIterator) {
    console.log(data.firstName);
  }
}())

