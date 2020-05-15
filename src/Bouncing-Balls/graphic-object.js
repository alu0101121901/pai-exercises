/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Balls
 * @file graphic-object.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 12/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Objeto Gráfico
 */

"use strict";

let ClassPainterForGraphicObject;
if (typeof require !== 'undefined') {
  ClassPainterForGraphicObject = require('../../src/Bouncing-Balls/painter.js').Painter;
}
else {
  ClassPainterForGraphicObject = Painter;
}


/**
 * @class GraphicObject
 * @description Clase que representa un objeto gráfico dentro de un canvas.
 */
class GraphicObject extends ClassPainterForGraphicObject {
  /**
   * @description Inicializa la forma del objeto gráfico, el punto inicial,
   * y el radio del objeto.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   * @param {Number} velocity Velocidad que tendrá el objeto gráfico
   * @param {Number} pointX Punto X de inicio
   * @param {Number} pointY Punto Y de inicio
   * @param {String} color Color del objeto gráfico
   */
  constructor(CANVAS, CTX, pointX, pointY) {
    super(CANVAS, CTX);
    this.currentCoordinates_ = {x: pointX, y: pointY};
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja el objeto gráfico y lo sitúa en el
   * punto que tiene como atributo
   */
  draw() {
    
  }
}

/**
 * Exportación de la clase ObjectGraphic
 */
if (typeof exports !== 'undefined') {
  exports.GraphicObject = GraphicObject;
}