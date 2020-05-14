/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - Life
 * @file chess.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 11/05/20
 * @version 1.0.0
 * @description Fichero que contiene el programa principal, y las funciones
 * que se activan al clickar los botones dentro del html de la práctica.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassLifeModel;

if (typeof require !== 'undefined') {
  ClassLifeModel = require('life-model.js').LifeModel;

}
else {
  ClassLifeModel = LifeModel;
}


/**
 * Variables globales para el funcionamiento del programa.
 */
const GRID_DENSITY = 50;
const CANVAS_BOARD = document.getElementById("lifeBoard");
const CONTEXT_BOARD = CANVAS_BOARD.getContext("2d");
const CANVAS_CONTAINER = document.getElementById("canvas-container");
CANVAS_BOARD.width = CANVAS_CONTAINER.clientWidth;
CANVAS_BOARD.height = CANVAS_BOARD.width;
const LIFE_MODEL = new ClassLifeModel(CANVAS_BOARD, CONTEXT_BOARD, GRID_DENSITY, GRID_DENSITY);
let isInitialized = false;
let isStopped = false; 

const STEP_BUTTON = document.getElementById("step");
STEP_BUTTON.addEventListener('click', step);
const START_BUTTON = document.getElementById("start");
START_BUTTON.addEventListener('click', start);
const PAUSE_BUTTON = document.getElementById("pause");
PAUSE_BUTTON.addEventListener('click', pause);
const END_BUTTON = document.getElementById("end");
END_BUTTON.addEventListener('click', end);

/**
 * @description Función que hace una iteración del juego de la vida,
 * comprobando primero si el juego ya ha empezado. En caso de no ser
 * así, toma el número de células iniciales y comienza el juego.
 */
function step() {
  const initialCells = document.getElementById("initialCells").value;
  if (!isInitialized) {
    LIFE_MODEL.startLifeGame(initialCells);
    isInitialized = true;
  }
  else
    LIFE_MODEL.makeALifeCycle();
  isStopped = true;
}

/**
 * @description Función que invoca step de forma infinita hasta que el flag
 * de Pause se convierta en true.
 */
async function start() {
  isStopped = false;
  while(!isStopped) {
    step();
    const GAME_VELOCITY = document.getElementById("velocity").value;
    const TIME_IN_MILISECONDS = 1 / GAME_VELOCITY * 1000;
    isStopped = false;
    await sleep(TIME_IN_MILISECONDS);
  }
}

/**
 * @description Función que pone el flag de pausa a true.
 */
function pause() {
  isStopped = true;
}

/**
 * @description Función que pone el flag de inicio de juego a falso, el de
 * parada a true e inicializa el tablero.
 */
function end() {
  isInitialized = false;
  isStopped = true;
  LIFE_MODEL.initializeBoard();
}

/**
 * @description Función que detiene la ejecución durante un tiempo pasado como
 * parámetro en el lugar donde sea invocada la función.
 * @param {Number} msToWait Milisegundos
 */
function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}

/**
 * @description Función que genera el tablero en el canvas junto con el cargado
 * de la página.
 */
function main() {
  LIFE_MODEL.initializeBoard();
}

main();