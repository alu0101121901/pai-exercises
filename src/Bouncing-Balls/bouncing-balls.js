/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Balls
 * @file bouncing-balls.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 15/05/20
 * @version 1.0.0
 * @description Fichero que contiene el programa principal, y las funciones
 * que se activan al clickar los botones dentro del html de la práctica.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */

let ClassBouncingBallsContainer;
if (typeof require !== 'undefined') {
  ClassBouncingBallsContainer = require('../src/Bouncing-Balls/bouncing-balls-container.js').BouncingBallsContainer;
}
else {
  ClassBouncingBallsContainer = BouncingBallsContainer;
}

/**
 * Variables de inicialización del canvas y el programa
 */
const HEADER_ELEMENT = document.getElementById("panel-header");
const CANVAS_CONTAINER = document.getElementById("canvas-container");
const CANVAS_BOUNCING = document.getElementById("bouncing");
// Tomar todo el alto del viewport menos la altura del header
CANVAS_BOUNCING.height = window.innerHeight - HEADER_ELEMENT.clientHeight - 20; 
CANVAS_BOUNCING.width = CANVAS_CONTAINER.clientWidth -10;
const CONTEXT_BOUNCING = CANVAS_BOUNCING.getContext("2d");
const BOUNCING_BALLS = new ClassBouncingBallsContainer(CANVAS_BOUNCING, CONTEXT_BOUNCING);

BOUNCING_BALLS.addBouncingBalls(10);

/**
 * @description Función que actualiza la posición de las bolas, actualizándose
 * en cada frame.
 */
function loop() {
  BOUNCING_BALLS.clear();
  BOUNCING_BALLS.updateBalls();
  requestAnimationFrame(loop);
}

loop();
