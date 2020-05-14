/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - LLife
 * @file board.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 11/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Board, cuya funcionalidad
 * es dibujar el tablero, y situar objetos sobre él.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainter;

if (typeof require !== 'undefined') {
  ClassPainter = require('../src/painter.js').Painter;
}
else {
  ClassPainter = Painter;
}

const GREEN = 'rgb(191, 255, 0)';


/**
 * @class Board
 * @extends Painter
 * @description Clase que se encarga de dibujar un tablero y de situar los
 * objetos convenientes sobre él. 
 */
class Board extends ClassPainter {
  /**
   * @description Pasa el canvas y su contexto a la clase base e inicializa 
   * el tamaño de los cuadrados del tablero a 0. Además carga las direcciones
   * de las imágenes, con el fin de que cuando se vayan a pintar en el tablero
   * ya estén cargadas.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   */
  constructor(CANVAS, CTX, nSquaresForRow) {
    super(CANVAS, CTX);
    this.squareLength_ = this.width_ / nSquaresForRow;
  }

  /* istanbul ignore next */
  /**
   * @description Método que invoca los métodos de dibujado del tablero.
   */
  draw() {
    this.drawLines();
  }
  
  
  /* istanbul ignore next */
  /**
   * @description Método que se encarga de escribir en el tablero lás líneas de
   * la cuadrícula.
   */
  drawLines() {
    for (let currentLine = this.squareLength_; currentLine < this.width_; currentLine += this.squareLength_ ) {
      this.ctx_.beginPath();
      this.ctx_.moveTo(currentLine, 0);
      this.ctx_.lineTo(currentLine, this.height_);
      this.ctx_.strokeStyle = "grey";
      this.ctx_.stroke();
      
      this.ctx_.beginPath();
      this.ctx_.moveTo(0, currentLine);
      this.ctx_.lineTo(this.width_, currentLine);
      this.ctx_.strokeStyle = "grey";
      this.ctx_.stroke();
    }
  }

  /* istanbul ignore next */
  /**
   * @description Método que pasados los índices de una celda del tablero y
   * la célula en cuestión, pinta en dicha celda su estado.
   * @param {Number} row índice de la fila
   * @param {Number} col índice de la columna
   * @param {String} cell label de la pieza
   */
  putOnBoard(row, col, cell) {
    this.ctx_.fillStyle = this.chooseColor(cell);
    this.ctx_.fillRect(this.squareLength_ * row + 1, this.squareLength_ * col + 1, this.squareLength_ - 2, this.squareLength_ - 2);
  }

  /**
   * @description Método que devuelve el color de la celda dependiendo
   * del estado de la célula.
   * @param {Number} cell Estado de la célula
   */
  chooseColor(cell) {
    if (cell === 0)
      return "black";
    else
      return GREEN;
  }

  /* istanbul ignore next */
  /**
   * @description Método que limpia el tablero.
   */
  clear() {
    this.ctx_.fillStyle = "black";
    this.ctx_.fillRect(0, 0, this.width_, this.height_);
  }
}

/**
 * Exportación de la clase Board
 */
if (typeof exports !== 'undefined') {
  exports.Board = Board;
}