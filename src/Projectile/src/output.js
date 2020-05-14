/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 10 PAI - Projectile
 * @file painter.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 27/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Output, cuya funcionalidad
 * es dibujar en el canvas los valores relevantes del tiro parabólico de
 * un proyectil.
 */

"use strict";
/* istanbul ignore next */
/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainter3;

if (typeof require !== 'undefined') {
  ClassPainter3 = require('./painter.js').Painter;
}
else {
  ClassPainter3 = Painter;
}


/**
 * @class Output
 * @extends Painter
 * @constructor Recibe el canvas y su contexto, se los pasa como argumentos
 * a la clase padre y como tercer argumento recibe un proyectil, del cual
 * escribe sus datos en un canvas.
 */
class Output extends ClassPainter3 {
  /**
   * @description Inicializa la clase base con el canvas y el contexto
   * e inicializa el atributo de la clase con el objeto Proyectil pasado
   * como argumento.
   * @param {Object} canvas Canvas
   * @param {Object} ctx Contexto del canvas
   * @param {Object} projectile Objeto Proyectil
   */
  constructor(canvas, ctx, projectile) {
    super(canvas, ctx);
    this.projectile_ = projectile; 
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que escribe en el canvas todos los datos relevantes
   * del lanzamiento parabólico de un proyectil.
   */
  writeResults() {
    this.ctx_.fillStyle = 'grey';
    this.ctx_.fillRect(0, 0, this.width_, this.height_);
    this.ctx_.font = "20px Times New Roman";
    this.ctx_.fillStyle = 'black';
    this.ctx_.fillText(`Altura máxima: ${this.projectile_.maxHeight().toFixed(3)} metros`, 10, 20);
    this.ctx_.fillText(`Distancia máxima: ${this.projectile_.maxDistance().toFixed(3)} metros`, 10, 60);
    this.ctx_.fillText(`Duración del proyectil en el aire: ${this.projectile_.totalTime().toFixed(3)} segundos`, 10, 100);
  }
}

/* istanbul ignore next */
/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Output = Output;
}