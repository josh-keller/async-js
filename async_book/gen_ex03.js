async function* generator(repo) {
  while (true) {
    const response = await fetch(repo);

    const data = await response.json();

    for (let commit of data) {
      yield commit;
    }

    const link = response.headers.get('Link');
    repo = /<(.*?)>; rel="next"/.exec(link)?. [1];

    if (repo === undefined) {
      break;
    }
  }
}

async function getCommits(repo) {
  let i = 0;

  for await (const commit of generator(repo)) {
    console.log(commit);

    if (++i === 90) {
      break;
    }
  }
}

getCommits('https://api.github.com/repos/tc39/proposal-temporal/commits');
