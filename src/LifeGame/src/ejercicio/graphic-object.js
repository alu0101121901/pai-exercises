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

let ClassPainter, ClassCircle;
if (typeof require !== 'undefined') {
  ClassPainter = require('../../src/painter.js').Painter;
  ClassCircle = require('../../src/painter.js').Circle;
}
else {
  ClassPainter = Painter;
  ClassCircle = Circle;
}


/**
 * @class GraphicObject
 * @description Clase que representa un objeto gráfico dentro de un canvas.
 */
class GraphicObject extends ClassPainter {
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
    this.object_ = new ClassCircle (CANVAS, CTX);
    this.currentCoordinates_ = {x: this.width_ / 2, y: this.height_ / 2};
    console.log(this.currentCoordinates_);
    this.radius_ = this.width_ * 0.1;
  }

  /* istanbul ignore next */
  /**
   * @description Método que inicializa el objeto gráfico y lo sitúa en el medio
   */
  initialize() {
    this.object_.draw(this.currentCoordinates_.x, this.currentCoordinates_.y, this.width_ * 0.1, 0, 2 * Math.PI, true);
  }

  /* instanbul ignore next */
  /**
   * @description Método que actualiza la posición del objeto en el canvas.
   * @param {Number} xPoints Número de pixeles que se desplaza en eje x
   * @param {*} yPoints Número de pixeles que se desplaza en eje y
   */
  move(xPoints, yPoints) {
    this.clearPreviousPosition();
    this.currentCoordinates_.x = this.currentCoordinates_.x + xPoints;
    this.currentCoordinates_.y += -yPoints;
    // if (this.isOnBoard()) 
      this.object_.draw(this.currentCoordinates_.x, this.currentCoordinates_.y, this.radius_, 0, 2 * Math.PI, true);
  }

  isOnBoard() {
    //if (this.currentCoordinates_.x )
  }
  
  /* instanbul ignore next */
  /**
   * @description Método que limpia el canvas.
   */
  clearPreviousPosition() {
    this.ctx_.clearRect(0, 0, this.width_, this.height_);
  }
}

/**
 * Exportación de la clase ObjectGraphic
 */
if (typeof exports !== 'undefined') {
  exports.GraphicObject = GraphicObject;
}