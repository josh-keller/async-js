import fetch from 'node-fetch';

const srcArr = [
  'https://eloux.com/async_js/examples/1.json',
  'https://eloux.com/async_js/examples/2.json',
  'https://thisisnotarealwebsiteihope.com', // Error
  'https://eloux.com/async_js/examples/3.json',
];

 srcArr[Symbol.asyncIterator] = async function*() {
   let i = 0;
   for (const url of this) {
     try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error('Unable to retrieve URL: ' + response.status);
       }
       const data = await response.json();
       yield data;
     } catch(e) {
       console.error(e)
     }
   }
 };

const asyncIterator = srcArr[Symbol.asyncIterator]();

(async function() {
  for await (const data of asyncIterator) {
    console.log(data.firstName);
  }
}())

