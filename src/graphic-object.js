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
 * @description Fichero que contiene la clase Objeto Gráfico
 */

"use strict";

let ClassPainterForGraphicObject, ClassCircle;
if (typeof require !== 'undefined') {
  ClassPainterForGraphicObject = require('../../src/painter.js').Painter;
  ClassCircle = require('../../src/painter.js').Circle;
}
else {
  ClassPainterForGraphicObject = Painter;
  ClassCircle = Circle;
}


/**
 * @class GraphicObject
 * @description Clase que representa un objeto gráfico dentro de un canvas.
 */
class GraphicObject extends ClassPainterForGraphicObject {
  constructor(CANVAS, CTX, velocity, pointX, pointY, color, colorToClear) {
    super(CANVAS, CTX);
    this.object_ = new ClassCircle (CANVAS, CTX, color);
    this.colorToClear_ = colorToClear;
    this.velocityX_ = velocity;
    this.velocityY_ = velocity;
    this.currentCoordinates_ = {x: pointX, y: pointY};
    this.radius_ = this.width_ * 0.01;
    this.initialize();
  }

  /* istanbul ignore next */
  /**
   * @description Método que inicializa el objeto gráfico y lo sitúa en el medio
   */
  initialize() {
    this.object_.draw(this.currentCoordinates_.x, this.currentCoordinates_.y, this.radius_, 0, 2 * Math.PI, true);
  }

  /* instanbul ignore next */
  /**
   * @description Método que actualiza la posición del objeto en el canvas.
   * @param {Number} xPoints Número de pixeles que se desplaza en eje x
   * @param {*} yPoints Número de pixeles que se desplaza en eje y
   */
  move(xPoints = 1, yPoints = 1) {
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
    // this.clearPreviousPosition();
    this.object_.draw(this.currentCoordinates_.x, this.currentCoordinates_.y, this.radius_, 0, 2 * Math.PI, true);
  }

  isOnBoard() {
    if (((this.currentCoordinates_.x + this.radius_) >= this.width_) || ((this.currentCoordinates_.x - this.radius_) <= 0)
     || ((this.currentCoordinates_.y + this.radius_) >= this.height_) || ((this.currentCoordinates_.x - this.radius_) <= 0))
      return false;
    return true;
  }

  
  /* instanbul ignore next */
  /**
   * @description Método que limpia el canvas.
   */
  clearPreviousPosition() {
    this.ctx_.fillStyle = this.colorToClear_;
    this.ctx_.clearRect(this.currentCoordinates_.x - this.radius_, this.currentCoordinates_.y - this.radius_,
       this.currentCoordinates_.x + this.radius_, this.currentCoordinates_.y + this.radius_);
  }
}

/**
 * Exportación de la clase ObjectGraphic
 */
if (typeof exports !== 'undefined') {
  exports.GraphicObject = GraphicObject;
}