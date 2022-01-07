const html = document.getElementsByTagName('html')[0];
const body = document.getElementsByTagName('body')[0];
html.style.width = '400px';
html.style.height = '400px';
body.style.width = '400px';
body.style.height = '400px';
const X_MAX = 400;
const Y_MAX = 400;
const R = 3;

init();

function init() {
  const randomPoints = [...Array(100).keys()].map(_ => {
    return {
      x: Math.random() * X_MAX,
      y: Math.random() * Y_MAX
    }
  });

  const trained = trainedWeights();

  const innerHtml = `<svg width="${X_MAX}" height="${Y_MAX}">`
    + randomPoints.map(point => `<circle cx="${point.x}" cy="${point.y}" r="${R}" fill="${guess(trained, point) === -1 ? 'blue' : 'red'}"/></circle>`)
    + `<line xl="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="purple"`
    + `</svg>`

  body.innerHTML = innerHtml;
}

function findTeam(point) {
  return point.x > point.y ? 1 : -1;
}

function randomWeights() {
  const max = 1;
  const min = -1;

  return {
    x: Math.random() * (max - min) + min,
    y: Math.random() * (max - min) + min
  }
}

function guess(weights, inputs) {
  const sum = inputs.x * weights.x + inputs.y * weights.y;
  const team = sum >= 0 ? 1 : -1;
  return team;
}

function train(weights, inputs, actualTeam) {
  const guessResult = guess(weights, inputs);
  const error = actualTeam - guessResult;
  return {
    x: weights.x + (inputs.x * error),
    y: weights.y + (inputs.y * error)
  }
}

function trainedWeights() {
  const trainExamples = [...Array(10000).keys()].map(_ => {
    return { x: Math.random(), y: Math.random() }
  });

  const startingRandomWeights = randomWeights();

  const trainedWeights = trainExamples.reduce((weights, inputs) => {
    const adjustedWeighes = train(weights, inputs, findTeam(inputs));
    // console.log(adjustedWeighes);
    return adjustedWeighes;
  }, startingRandomWeights);

  return trainedWeights;
}