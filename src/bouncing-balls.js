

let ClassBouncingBallsContainer;
if (typeof require !== 'undefined') {
  ClassBouncingBallsContainer = require('../src/board.js').BouncingBallsContainer;
}
else {
  ClassBouncingBallsContainer = BouncingBallsContainer;
}

const HEADER_ELEMENT = document.getElementById("panel-header");
const CANVAS_CONTAINER = document.getElementById("canvas-container");
const CANVAS_BOUNCING = document.getElementById("bouncing");
// Tomar todo el alto del viewport menos la altura del header
CANVAS_BOUNCING.height = window.innerHeight - HEADER_ELEMENT.clientHeight - 40; 
CANVAS_BOUNCING.width = CANVAS_CONTAINER.clientWidth;
const CONTEXT_BOUNCING = CANVAS_BOUNCING.getContext("2d");
const BOUNCING_BALLS = new ClassBouncingBallsContainer(CANVAS_BOUNCING, CONTEXT_BOUNCING);

function loop() {

  BOUNCING_BALLS.updateBalls();
  
  requestAnimationFrame(loop);
}

loop();

function add() {
  BOUNCING_BALLS.addBouncingBall();
}

/**
 * @description Función que detiene la ejecución durante un tiempo pasado como
 * parámetro en el lugar donde sea invocada la función.
 * @param {Number} msToWait Milisegundos
 */
function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}
