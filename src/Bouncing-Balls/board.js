/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Balls
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
let ClassPainter, ClassGraphicObject;

if (typeof require !== 'undefined') {
  ClassPainter = require('../src/painter.js').Painter;
  ClassGraphicObject = require('../src/graphic-object.js').GraphicObject;
}
else {
  ClassPainter = Painter;
  ClassGraphicObject = GraphicObject;
}

const BACKGROUND_COLOR = '#212121';

/**
 * @class BouncingBallsContainer
 * @extends Painter
 * @description Clase que se encarga de dibujar el fondo del y de situar los
 * objetos convenientes sobre él. 
 */
class BouncingBallsContainer extends ClassPainter {
  /**
   * @description Pasa el canvas y su contexto a la clase base e inicializa 
   * el tamaño de los cuadrados del tablero a 0. Además carga las direcciones
   * de las imágenes, con el fin de que cuando se vayan a pintar en el tablero
   * ya estén cargadas.
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   */
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
    this.bouncingBalls_ = [];
  }

  addBouncingBall() {
      this.bouncingBalls_.push(new ClassGraphicObject(this.canvas_, this.ctx_, this.randomVelocity(), this.randomCoordinateX(),
      this.randomCoordinateY(), this.randomColor(), BACKGROUND_COLOR));
  }
  
  updateBalls () {
    for (let currentBall = 0; currentBall < this.bouncingBalls_.length; currentBall++) {
      this.clear();
      this.bouncingBalls_[currentBall].move();
    }
      
  }

  randomVelocity() {
    return Math.random() * 10;
  }

  randomCoordinateX() {
    return Math.floor(Math.random() * this.width_);
  }

  randomCoordinateY() {
    return Math.floor(Math.random() * this.height_);
  }

  randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }

  /* istanbul ignore next */
  /**
   * @description Método que limpia el tablero.
   */
  clear() {
    this.ctx_.fillStyle = BACKGROUND_COLOR;
    this.ctx_.fillRect(0, 0, this.width_, this.height_);
  }
}

/**
 * Exportación de la clase BouncingBallsContainer
 */
if (typeof exports !== 'undefined') {
  exports.BouncingBallsContainer = BouncingBallsContainer;
}