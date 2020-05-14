/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
 * @file grid.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 20/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Grid, que, pasado un numero de
 * líneas (horizontales), inicializa y pinta la cuadrícula en el canvas.
 */


"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainter;

if (typeof require !== 'undefined') {
  ClassPainter = require('./painter.js').Painter;
}
else {
  ClassPainter = Painter;
}

class Grid extends ClassPainter {
  /**
   * @constructor Constructor de la cuadrícula
   * @description Manda como argumentos a la clase padre el canvas y contexto
   * y partir de un número de líneas pasada crea la cuadrícula.
   * @param {Number} lines Valor que se utiliza para calcular
   * el numero de líneas horizontales del grid
   * @param {Object} canvas Objeto que representa el canvas
   * @param {Object} ctx Contexto del canvas
   */
  constructor(lines, canvas, ctx) {
    super(canvas, ctx);
    this.lines_ = lines;
    this.length_ = 0;
    this.density_ = 0;
  }
   /* istanbul ignore next */
  /**
   * @description Método que dibuja la cuadrícula, trazando en primer lugar
   * las líneas del centro y a partir de ellas las líneas hacia los extremos,
   * manteniendo una distancia equitativa calculada entre éstas.
   */
  initialize() {
    this.length_ = this.height_ / this.lines_;
    
    this.ctx_.beginPath();
    let verticalLinesCounter = 0;
    for (let i = this.width_ / 2; i < this.width_; i = i + this.length_) {
      this.ctx_.moveTo(i, 0);
      this.ctx_.lineTo(i, this.height_);
      verticalLinesCounter++;
    }

    for (let i = this.width_ / 2 - this.length_; i > 0; i = i - this.length_) {
      this.ctx_.moveTo(i, 0);
      this.ctx_.lineTo(i, this.height_);
      verticalLinesCounter++;
    }

    this.density_ = (verticalLinesCounter - 1) * (this.lines_ - 1);
    console.log(this.density_);

    for (let i = 0; i < this.height_; i = i + this.length_) {
      this.ctx_.moveTo(0, i);
      this.ctx_.lineTo(this.width_, i);
    }

    this.ctx_.fillRect(this.width_ / 2, this.height_ / 2, 4, 4);

    this.ctx_.stroke();


  }
  /**
   * @description Método que devuelve la longitud del cuadrado
   * @returns Valor numérico de la longitud de un lado del cuadrado
   * del canvas.
   */
  get length () {
    return this.length_;
  }

  /**
   * @description Método que asigna un valor a la longitud de la clase
   */
  set length (value) {
    this.length_ = value;
  }
  
  /**
   * @description Método que devuelve el número de intersecciones
   * @returns Valor numérico del número de intersecciones de la cuadrícula
   */
  get density () {
    return this.density_;
  }
  
   /**
   * @description Método que asigna un valor a la densidad de la cuadrícula
   */
  set density (value) {
    this.density_ = value;
  }
}



/**
 * Exportación de la clase Grid
 */
if (typeof exports !== 'undefined') {
  exports.Grid = Grid;
}