/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
 * @file random-walk.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 20/04/20
 * @version 1.0.0
 * @description Fichero que contiene el programa principal, que es invocada
 * desde el .html, iniciando la ejecución del Random Walk mediante la función
 * createRandomPath
 */

"use strict";

/* let ClassRandomWalkGenerator;

if (typeof require !== 'undefined') {
  ClassRandomWalkGenerator = require('./random-walk-generator.js').RandomWalkGenerator;
}
else {
  ClassRandomWalkGenerator = RandomWalkGenerator;
} */

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassGrid, ClassRandomStep;

if (typeof require !== 'undefined') {
  ClassRandomStep = require('./random-step.js').RandomStep;
  ClassGrid = require('./grid.js').Grid;
}
else {
  ClassRandomStep = RandomStep;
  ClassGrid = Grid;
}

/**
 * @description Función asíncrona que pinta pasos en la cuadrícula hasta
 * encontrarse con alguna de las paredes del canvas. El trazo de la línea
 * en el canvas sufre un pequeño retardo de 0.5, de modo que se pueda ver qué
 * caminos va tomando el random walk. 
 * @param {Object} randomSteps Objeto de la clase RandomStep
 * @param {Object} ctx Contexto 2D del canvas
 */
async function createRandomPath(randomSteps, ctx) {
  let steps = 0;
    while(randomSteps.insideOfGrid()) {
      let position1 = randomSteps.currentPosition;
      await sleep(150);
      randomSteps.step();
      await sleep (100);
      let position2 = randomSteps.currentPosition;
      ctx.moveTo(position1[0], position1[1]);
      ctx.lineTo(position2[0], position2[1]);
      
      ctx.strokeStyle = 'blue';
      ctx.stroke();
      steps++;
    }
    await sleep(500);
    alert("Fin de la animación con " + steps + " pasos dados.");

}

/**
 * @description Programa principal que crea los objetos e invoca los métodos
 * necesarios para el funcionamiento de la práctica
 */
function main () {
  const CANVAS = document.getElementById("randomwalk");
  if (CANVAS.getContext) {
    const ctx = CANVAS.getContext('2d');
    ctx.beginPath();
    let lines = 20;
    const GRID = new ClassGrid(lines, CANVAS, ctx);
    GRID.initialize();
    const MIDDLE_POINT = [CANVAS.width / 2, CANVAS.height / 2];
    const STEPS = new ClassRandomStep(GRID.length, MIDDLE_POINT, CANVAS, ctx);
    createRandomPath(STEPS, ctx);
  }
}

/**
 * @description Función que detiene la ejecución durante un tiempo dado en el 
 * lugar que se invoque. El método que invoque sleep deberá ser asíncrono.
 * @param {Number} miliseconds Cantidad de milisegundos que permanece dormida
 * la ejecución.
 */
function sleep (miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}

main();