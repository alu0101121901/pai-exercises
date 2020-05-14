/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file painter.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 25/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase base Painter, cuya funcionalidad
 * es abstraer a sus clases hijas tanto el canvas como su contexto.
 */


"use strict";

/**
 * @class Painter
 * @description Clase base que almacena el canvas y su contexto, abstrayendo a sus
 * clases derivadas de estos atributos.
 */
class Painter {
  /**
   * @description Almacena el contexto del canvas y sus dimensiones como 
   * atributos privados.
   * @param {Object} canvas 
   * @param {Object} ctx 
   */
  constructor(canvas, ctx) {
    if (canvas !== undefined) {
      this.height_ = canvas.height;
      this.width_ = canvas.width;
    }
    else {
      this.height_ = 1;
      this.width_ = 1;
    }

    this.ctx_ = ctx;
  }

  get width () {
    return this.width_;
  }
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Painter = Painter;
}