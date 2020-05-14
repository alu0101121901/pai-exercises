/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file chess-view.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase ChessView, cuya funcionalidad
 * es encargarse del muestreo gráfico al usuario de los calculos efectuados
 * por la clase ChessController.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassBoard, ClassOutput;

if (typeof require !== 'undefined') {
  ClassBoard = require('../src/board.js').Board;
  ClassOutput = require('../src/output.js').Output;
}
else {
  ClassBoard = Board;
  ClassOutput = Output;
}

/**
 * @class ChessView
 * @description Clase que se encarga del muestreo gráfico al usuario de los 
 * calculos efectuados por la clase ChessController.
 */
class ChessView {
  /**
   * @description Constructor de la clase que pasa al atributo que almacena
   * el tablero el Canvas y el Contexto para que pueda ser dibujado en el 
   * canvas.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas 
   */
  constructor(CANVAS_BOARD, CTX_BOARD, CANVAS_OUTPUT, CTX_OUTPUT) {
    this.chessBoard_ = new ClassBoard(CANVAS_BOARD, CTX_BOARD);
    this.chessOutput_ = new ClassOutput(CANVAS_OUTPUT, CTX_OUTPUT);
  }

  /* istanbul ignore next */
  /**
   * @description Método que invoca los métodos de dibujado del tablero de 
   * la clase Board.
   */
  drawBoard() {
    this.chessBoard_.draw();
    this.chessBoard_.drawNumbers();
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que limpia el tablero.
   */
  clearBoard() {
    this.chessBoard_.clear();
  }


  /**
   * @description Método que invoca al método de carga de imágenes de 
   * la clase tablero.
   */
  // loadImages() {
  //  this.chessBoard_.loadPieces();
  // }

  /* istanbul ignore next */
  /**
   * @description Método que dada una configuratión, pinta en el tablero
   * las piezas en sus posiciones correspondientes.
   * @param {Object} currentConfiguration Matriz de piezas
   */
  updateBoard(currentConfiguration) {
    this.chessOutput_.clear();
    for(let currentRow = 0; currentRow < 8; currentRow++) {
      for (let currentCol = 0; currentCol < 8; currentCol++) {
        let currentPiece = currentConfiguration.getData(currentRow, currentCol);
        if (currentPiece !== undefined)
          this.chessBoard_.putOnBoard(currentCol, currentRow, currentPiece);
      }
    }
  }

  /* istanbul ignore next */
  /**
   * @description Método que dibuja en el output la configuración en notación 
   * algebraica de una solución de las 8 reinas, almacenada en
   * currentConfiguration.
   * @param {Object} currentConfiguration Matriz de piezas
   */
  getAlgebraicEightQueensConfiguration(currentConfiguration) {
    let letters = "HGFEDCBA";
    let numbers = "12345678";
    let algebraicConfiguration = "";
    for (let currentRow = 0; currentRow < 8; currentRow++) {
      for (let currentCol = 0; currentCol < 8; currentCol++) {
        if (currentConfiguration.getData(currentRow, currentCol) === "Black Queen")
          algebraicConfiguration += letters[currentCol] + numbers[currentRow] + " ";
      }
    }
    this.chessOutput_.writeResultsOf(algebraicConfiguration);
  }
}


/**
 * Exportación de la clase ChessView
 */
if (typeof exports !== 'undefined') {
  exports.ChessView = ChessView;
}