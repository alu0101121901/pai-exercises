/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 13 PAI - Bouncing Balls
 * @file bouncing-balls-container.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 11/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase BouncingBallsContainer,
 * cuya funcionalidad es almacenar las bolas y de dibujarlas en el 
 * tablero.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainter, ClassBouncingBall;

if (typeof require !== 'undefined') {
  ClassPainter = require('../Bouncing-Balls/painter').Painter;
  ClassBouncingBall = require('../Bouncing-Balls/bouncing-ball.js').BouncingBall;
}
else {
  ClassPainter = Painter;
  ClassBouncingBall = BouncingBall;
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
   * el tamaño del tablero. Además inicializa el array de bouncing balls
   * @param {Object} CANVAS Canvas
   * @param {Object} CTX Contexto del canvas
   */
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
    this.bouncingBalls_ = [];
  }

  /**
   * @description Método que añade al contenedor el número de bolas que se
   * le pasen por parámetro.
   * @param {Number} nBalls 
   */
  addBouncingBalls (nBalls) {
    while(this.bouncingBalls_.length < nBalls) {
      let ball = new ClassBouncingBall(this.canvas_, this.ctx_, this.random(-10, 10), this.random(10, -10), this.random(this.width_ * 0.01, this.width_ - this.width_ * 0.01),
      this.random(this.width_ * 0.01, this.height_ - this.width_ * 0.01), this.randomColor());

      this.bouncingBalls_.push(ball);
    }
  }

  get balls() {
    return this.bouncingBalls_;
  }

  /**
   * @description Método que añade una bouncing ball al contenedor
   */
  addBouncingBall() {
    let newBouncingBall = new ClassBouncingBall(this.canvas_, this.ctx_, this.random(-10, 10), this.random(10, -10), this.random(this.width_ * 0.01, this.width_ - this.width_ * 0.01),
    this.random(this.width_ * 0.01, this.height_ - this.width_ * 0.01), this.randomColor());
    this.bouncingBalls_.push(newBouncingBall);
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que actualiza todas las bouncing balls del contenedor
   */
  updateBalls () {
    for (let currentBall = 0; currentBall < this.bouncingBalls_.length; currentBall++) {
      this.bouncingBalls_[currentBall].move();
      this.bouncingBalls_[currentBall].draw();
    }     
  }

  /**
   * @description Método que devuelve un número aleatorio acotado en un rango.
   * @param {Number} min Numero
   * @param {Number} max Número
   * @returns Number
   */
  random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  /**
   * @description Método que devuelve un color aleatorio
   * @returns String que representa los valores rgb de un color
   */
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