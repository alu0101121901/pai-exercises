/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
 * @file random-step.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 20/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase RandomStep, cuya funcionalidad
 * es llevar a cabo los pasos sobre las líneas de la cuadrícula de forma
 * aleatoria.
 */

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
"use strict";

let ClassPainter2;

if (typeof require !== 'undefined') {
  ClassPainter2 = require('./painter.js').Painter;
}
else {
  ClassPainter2 = Painter;
}
/**
 * @class RandomStep
 * @description Clase cuya funcionalidad es dar pasos de una distancia
 * constante en un sentido aleatorio.
 * @extends ClassPainter2 Clase que contiene el canvas y su contexto.
 */
class RandomStep extends ClassPainter2 {
  constructor(length, startPoint, canvas, ctx) {
    super(canvas, ctx);
    this.length_ = length;
    this.position_ = startPoint;
  }
   /* istanbul ignore next */
  /**
   * @description Método que, tras obtener un sentido y teniendo una distancia
   * fijada como atributo privado, actualiza su posición en el canvas y traza 
   * una línea desde el punto en el que se encontraba hasta el nuevo calculado.
   */
  step() {
    let direction = this.chooseDirection();
    this.ctx_.beginPath();
    this.ctx_.moveTo(this.position_[0], this.position_[1]);
    this.position_[0] += direction[0] * this.length_;
    this.position_[1] += direction[1] * this.length_;
    this.ctx_.lineTo(this.position_[0], this.position_[1]);
    this.ctx_.lineWidth = 3;
    this.ctx_.strokeStyle = 'red';
    this.ctx_.stroke();
  }
  /**
   * @description Método que devuelve la posición actual del walker.
   * @returns Array con coordenadas x e y
   */
  get currentPosition() {
    return this.position_;
  }

  /**
   * @description Método que asigna una nueva posición
   */
  set currentPosition(newp) {
    this.position_ = newp;
  }
  
  /**
   * @description Método que comprueba si la posición actual del walker se ha 
   * salido del canvas, retornando falso en dicho caso.
   * @returns Falso si supera las dimensiones del canvas, Verdadero en otro
   * caso.
   */
  insideOfGrid() {
    if(this.position_[0] >= this.width_ || this.position_[1] >= this.height_ ||
       this.position_[0] <= 0 || this.position_[1] <= 0)
      return false;    
    return true;
  }

  /**
   * @description Método que elige aleatoriamente un sentido para el nuevo paso
   * que se vaya a realizar.
   * @returns Array de dos valores que almacena el sentido en los ejes X e Y
   */
  chooseDirection() {
    let option = Math.floor(Math.random() * 4);
    switch(option) {
      case 0: // Abajo
        return [0, 1];
      case 1: // Arriba
        return [0, -1];
      case 2: // Izquierda
        return [-1, 0];
      case 3: // Derecha
        return [1, 0];
    }
  }
}


/**
 * Exportación de la clase RandomStep
 */
if (typeof exports !== 'undefined') {
  exports.RandomStep = RandomStep;
}