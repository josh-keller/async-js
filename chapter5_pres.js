function localData() {
  return "local data";
}

function fastRemoteData() {
  return new Promise(resolve => setTimeout(() => resolve("fast remote"), 200));
}

function slowRemoteData() {
  return new Promise(resolve => setTimeout(() => resolve("slow remote"), 2000));
}

function mediumRemoteData() {
  return new Promise(resolve => setTimeout(() => resolve("medium remote"), 550));
}

function errorRemoteData() {
  return Promise.reject("error");
}

function localDBCall() {
  console.log("called local db");
  return new Promise(resolve => setTimeout(() => resolve("local db"), 100));
}

function fetchData(fetchFunc) {
  const timeout = new Promise((_, reject) => setTimeout(() => reject("timeout"), 1000));
  // const localDB = new Promise((resolve) => setTimeout(() => localDBCall().then(data => resolve(data)), 500))
  const response = Promise.race([fetchFunc(), timeout])

  response
    .then(response => console.log(response))
    .catch((error) => console.log(error, localData()));
}

fetchData(fastRemoteData);
fetchData(slowRemoteData);
fetchData(errorRemoteData);
// fetchData(mediumRemoteData);
