/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - Life
 * @file graphic-object.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 12/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Circle
 */

"use strict";


let ClassPainterForCircle;
if (typeof require !== 'undefined') {
  ClassPainter = require('../../src/painter.js').Painter;
  // ClassCircle = require('../../src/painter.js').Circle;
}
else {
  ClassPainterForCircle = Painter;
  // ClassCircle = Circle;
}

/**
 * @class Circle
 * @description Clase cuya funcionalidad es representar un círculo en el canvas
 */
class Circle extends ClassPainterForCircle {
  /**
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   */
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
  }

  /* istanbul ignore next */
  /**
   * @description Método que dibuja en el canvas el círculo.
   * @param {Number} originPointX 
   * @param {Number} originPointY 
   * @param {Number} radius 
   * @param {Number} start 
   * @param {Number} end 
   * @param {Number} isFilled 
   */
  draw(originPointX, originPointY, radius, start, end, isFilled = false) {
    this.ctx_.beginPath();
    this.ctx_.arc(originPointX, originPointY, radius, start, end, false);
    if (isFilled) {
      this.ctx_.fillStyle = "purple";
      this.ctx_.fill();  
    }
      
  }
}

/**
 * Exportación de la clase Circle
 */
if (typeof exports !== 'undefined') {
  exports.Circle = Circle;
}