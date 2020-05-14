/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - Life
 * @file life-model.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 11/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase LifeModel, que recibe
 * manipulaciones desde LifeController con las que actualiza el 
 * LifeView, acorde al modelo Vista-Computador.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassLifeView, ClassLifeController;

if (typeof require !== 'undefined') {
  ClassLifeView = require('../src/life-view.js').LifeView;
  ClassLifeController = require('../src/life-controller.js').LifeController;
}
else {
  ClassLifeView = LifeView;
  ClassLifeController = LifeController;
}


/**
 * @class LifeModel
 * @description Clase que tiene como atributos la vista y la parte 
 * computacional del juego de la vida en LifeView y LifeController 
 * respectivamente.
 */
class LifeModel {
  /**
   * @description Constructor de la clase que le pasa el Canvas y su contexto
   * al objeto LifeView para que pueda dibujar el tablero en el canvas.
   * Asímismo, se encarga también de inicializar LifeController.
   * @param {Object} CANVAS_BOARD Canvas del tablero
   * @param {Object} CTX_BOARD Contexto del Canvas del tablero
   */
  constructor(CANVAS_BOARD, CTX_BOARD, rows, cols) {
    this.lifeView_ = new ClassLifeView(CANVAS_BOARD, CTX_BOARD, rows);
    this.lifeController_ = new ClassLifeController(rows, cols);
  }

  /* istanbul ignore next */
  /**
   * @description Método que invoca al método de dibujado del tablero del
   * atributo LifeView, limpiándolo previamente.
   */
  initializeBoard() {
    this.lifeView_.clearBoard();
    this.lifeView_.drawBoard();
  }

  /* istanbul ignore next */
  /**
   * @description Método que recibe la configuración inicial del
   * juego de la vida desde el controller y es pasada al view para
   * que sea pintada en el canvas.
   */
  startLifeGame(cellsAlive = 5) {
    this.lifeController_.playLife(cellsAlive);
    this.lifeView_.updateBoard(this.lifeController_.matrix);
  }

  /* istanbul ignore next */
  /**
   * @description Método que realiza un ciclo de vida en el juego.
   */
  makeALifeCycle() {
    this.lifeController_.cycle();
    this.lifeView_.updateBoard(this.lifeController_.matrix);
  }
}


/**
 * Exportación de la clase LifeModel
 */
if (typeof exports !== 'undefined') {
  exports.LifeModel = LifeModel;
}