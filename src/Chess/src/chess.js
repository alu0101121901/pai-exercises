/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file chess.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene el programa principal, y las funciones
 * que se activan al clickar los botones dentro del html de la práctica.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassChessModel;

if (typeof require !== 'undefined') {
  ClassChessModel = require('chess-model.js').ChessModel;

}
else {
  ClassChessModel = ChessModel;
}

/**
 * Variables globales para el funcionamiento del programa.
 */
const CANVAS_BOARD = document.getElementById("chessBoard");
const CONTEXT_BOARD = CANVAS_BOARD.getContext("2d");
const CANVAS_OUTPUT = document.getElementById("output");
const CONTEXT_OUTPUT = CANVAS_OUTPUT.getContext("2d");
const CHESS_MODEL = new ClassChessModel(CANVAS_BOARD, CONTEXT_BOARD, CANVAS_OUTPUT, CONTEXT_OUTPUT);
let solutionNumber = 1;

/**
 * @description Función que se activa desde el html y que lleva a cabo la
 * solución de las 8 reinas. En función del valor del checkbox, ejecutará
 * el algoritmo clásico o el generalizado.
 */
function generateSolution() {
  let eightQueensFlag = document.getElementById("cb");
  if (eightQueensFlag.checked) {
    CHESS_MODEL.solveEightQueens(1);
    console.log("General");
  }
  else {
    CHESS_MODEL.solveEightQueens(0);
    console.log("Clasico");
  }
  solutionNumber = 1;
}

/**
 * @description Función que obtiene la nésima solución del problema de las 
 * 8 reinas.
 */
function getNextSolution() {
  CHESS_MODEL.getAnEightQueensSolution(solutionNumber++);
}

/**
 * @description Función que obtiene la configuración en el tablero de una
 * partida de ajedrez inicial.
 */
function chessStart() {
  CHESS_MODEL.startChessPieces();
}

/**
 * @description Función que genera el tablero en el canvas junto con el cargado
 * de la página.
 */
function main() {
  CHESS_MODEL.initializeBoard();
}

main();