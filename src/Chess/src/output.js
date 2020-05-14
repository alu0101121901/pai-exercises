/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file output.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 27/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Output, cuya funcionalidad
 * es dibujar en el canvas cualquier cadena que se le pase.
 */

"use strict";
/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainterForOutput;

if (typeof require !== 'undefined') {
  ClassPainterForOutput = require('../src/painter.js').Painter;
}
else {
  ClassPainterForOutput = Painter;
}


/**
 * @class Output
 * @extends Painter
 */
class Output extends ClassPainterForOutput {
  /**
   * @description Inicializa la clase base con el canvas y el contexto.
   * @param {Object} canvas Canvas
   * @param {Object} ctx Contexto del canvas
   */
  constructor(canvas, ctx) {
    super(canvas, ctx);
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que escribe en el canvas la información que se le pase
   * como argumento.
   */
  writeResultsOf(infoToWrite) {
    this.clear();
    this.ctx_.font = "bold 12px sans-serif";
    this.ctx_.fillStyle = 'black';
    this.ctx_.fillText(`${infoToWrite}`, 10, this.height_ / 2);
  }

  /* istanbul ignore next */
  /**
   * @description Método que limpia el canvas del output
   */
  clear() {
    this.ctx_.fillStyle = 'whitesmoke';
    this.ctx_.fillRect(0, 0, this.width_, this.height_);
  }
}

/* istanbul ignore next */
/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Output = Output;
}