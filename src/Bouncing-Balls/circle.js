/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Ball
 * @file circle.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 12/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Circle
 */

"use strict";

let ClassGraphicObject;
if (typeof require !== 'undefined') {
  ClassGraphicObject = require('../../src/Bouncing-Balls/graphic-object.js').GraphicObject;

}
else {
  ClassGraphicObject = GraphicObject;
}

/**
 * @class Circle
 * @description Clase cuya funcionalidad es representar un círculo en el canvas
 */
class Circle extends ClassGraphicObject {
  /**
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   */
  constructor(CANVAS, CTX, pointX, pointY, radius, color) {
    super(CANVAS, CTX, pointX, pointY);
    this.colour_ = color;
    this.radius_ = radius;
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
  draw() {
    this.ctx_.beginPath();
    this.ctx_.arc(this.currentCoordinates_.x, this.currentCoordinates_.y, this.radius_, 0, Math.PI * 2, false);
    this.ctx_.fillStyle = this.colour_;
    this.ctx_.fill();  
  }
}

/**
 * Exportación de la clase Circle
 */
if (typeof exports !== 'undefined') {
  exports.Circle = Circle;
}