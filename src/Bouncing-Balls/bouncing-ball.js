/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Balls
 * @file bouncing-ball.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 15/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase BouncingBall,
 * cuya funcionalidad es representar el movimiento de una bouncing ball.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassCircle;

if (typeof require !== 'undefined') {
  ClassCircle = require('../Bouncing-Balls/circle').Circle;
}
else {
  ClassCircle = Circle;
}

/**
 * @class BouncingBall
 * @description Clase que representa el movimiento de una bouncing ball
 */
class BouncingBall extends ClassCircle {

  /**
   * @description Toma las velocidades pasadas, y pasa el canvas, su contexto,
   * el punto de origen y el color a su clase padre.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto
   * @param {Number} velocityX Velocidad en x
   * @param {Number} velocityY Velocidad en y
   * @param {Number} pointX Punto de origen en X
   * @param {Number} pointY Punto de origen en Y
   * @param {String} color Color
   */
  constructor(CANVAS, CTX, velocityX, velocityY, pointX, pointY, color) {
    super(CANVAS, CTX, pointX, pointY, CANVAS.width * 0.01, color);
    this.velocityX_ = velocityX;
    this.velocityY_ = velocityY;
  }
  /**
   * @description Método que actualiza la posición del objeto en el canvas,
   * cambiando su dirección si llega a los límites del contenedor.
   */
  move() {
    if ((this.currentCoordinates_.x + this.radius_) >= this.width_)
      this.velocityX_ = -this.velocityX_;
    if ((this.currentCoordinates_.x - this.radius_) <= 0)
      this.velocityX_ = - this.velocityX_;
    if ((this.currentCoordinates_.y + this.radius_) >= this.height_)
      this.velocityY_ = - this.velocityY_;
    if ((this.currentCoordinates_.y - this.radius_) <= 0)
      this.velocityY_ = - this.velocityY_;

    this.currentCoordinates_.x += this.velocityX_;
    this.currentCoordinates_.y += this.velocityY_;     
  }

  get currentCoordinates() {
    return this.currentCoordinates_;
  }
}


/**
 * Exportación de la clase ObjectGraphic
 */
if (typeof exports !== 'undefined') {
  exports.BouncingBall = BouncingBall;
}