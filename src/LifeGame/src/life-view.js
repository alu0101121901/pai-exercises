/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - Life
 * @file life-view.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 11/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase LifeView, cuya funcionalidad
 * es encargarse del muestreo gráfico al usuario de los calculos efectuados
 * por la clase LifeController.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassBoard;

if (typeof require !== 'undefined') {
  ClassBoard = require('../src/board.js').Board;
}
else {
  ClassBoard = Board;
}

/**
 * @class LifeView
 * @description Clase que se encarga del muestreo gráfico al usuario de los 
 * calculos efectuados por la clase LifeController.
 */
class LifeView {
  /**
   * @description Constructor de la clase que pasa al atributo que almacena
   * el tablero el Canvas y el Contexto para que pueda ser dibujado en el 
   * canvas.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas 
   */
  constructor(CANVAS_BOARD, CTX_BOARD, rows) {
    this.lifeBoard_ = new ClassBoard(CANVAS_BOARD, CTX_BOARD, rows);
  }

  /* istanbul ignore next */
  /**
   * @description Método que invoca los métodos de dibujado del tablero de 
   * la clase Board.
   */
  drawBoard() {
    this.lifeBoard_.draw();
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que limpia el tablero.
   */
  clearBoard() {
    this.lifeBoard_.clear();
  }

  /* istanbul ignore next */
  /**
   * @description Método que dada una configuración, pinta en el tablero
   * los estados de las células en sus posiciones correspondientes.
   * @param {Object} currentConfiguration Matriz de células
   */
  updateBoard(currentConfiguration) {
    for(let currentRow = 0; currentRow < currentConfiguration.rows; currentRow++) {
      for (let currentCol = 0; currentCol < currentConfiguration.cols; currentCol++) {
        let currentPiece = currentConfiguration.getData(currentRow, currentCol);
        this.lifeBoard_.putOnBoard(currentCol, currentRow, currentPiece);
      }
    }
  }
}


/**
 * Exportación de la clase LifeView
 */
if (typeof exports !== 'undefined') {
  exports.LifeView = LifeView;
}