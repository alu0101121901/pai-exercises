/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file chess-model.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase ChessModel, que recibe
 * manipulaciones desde ChessController con las que actualiza el 
 * ChessView, acorde al modelo Vista-Computador.
 */

"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassChessView , ClassChessController;

if (typeof require !== 'undefined') {
  ClassChessView = require('../src/chess-view.js').ChessView;
  ClassChessController = require('../src/chess-controller.js').ChessController;
}
else {
  ClassChessView = ChessView;
  ClassChessController = ChessController;
}


/**
 * @class ChessModel
 * @description Clase que tiene como atributos la vista y la parte
 * computacional del ajedrez en ChessView y ChessController respectivamente.
 */
class ChessModel {
  /**
   * @description Constructor de la clase que le pasa el Canvas y su contexto
   * al objeto ChessView para que pueda dibujar el tablero en el canvas.
   * Asímismo, se encarga también de inicializar ChessController.
   * @param {Object} CANVAS_BOARD Canvas del tablero
   * @param {Object} CTX_BOARD Contexto del Canvas del tablero
   * @param {Object} CANVAS_OUTPUT Canvas del Output
   * @param {Object} CTX_OUTPUT Contexto del Canvas del Output
   */
  constructor(CANVAS_BOARD, CTX_BOARD, CANVAS_OUTPUT, CTX_OUTPUT) {
    this.chessView_ = new ClassChessView(CANVAS_BOARD, CTX_BOARD, CANVAS_OUTPUT, CTX_OUTPUT);
    this.chessController_ = new ClassChessController();
  }

  /* istanbul ignore next */
  /**
   * @description Método que invoca al método de dibujado del tablero del
   * atributo ChessView, limpiándolo previamente.
   */
  initializeBoard() {
    this.chessView_.clearBoard();
    this.chessView_.drawBoard();
  }

  /* istanbul ignore next */
  /**
   * @description Método que recibe la primera solución de las 8 reinas, que
   * ejecutará el metodo generalizado o el clásico dependiendo de la 
   * opción pasada como argumento.
   * @param {Number} option Valor (0 o 1)
   */
  solveEightQueens(option) {
    this.initializeBoard();
    this.chessController_.solveEightQueens(option);
    this.getAnEightQueensSolution(0);
  }

  /* istanbul ignore next */
  /**
   * @description Método que recibe la n-ésima solución de las 8 reinas desde
   * el controller, que ejecutará el metodo generalizado o el clásico 
   * dependiendo de la opción pasada como argumento. Posteriormente, esta
   * configuración es pasada al view para que lo pinte en el canvas.
   * @param {Number} option Valor (0 o 1)
   */
  getAnEightQueensSolution(solutionNumber) {
    this.initializeBoard();
    let boardConfig = this.chessController_.getASolutionFromEightQueens(solutionNumber);
    if (boardConfig !== -1) {
      this.chessView_.updateBoard(boardConfig);
      this.chessView_.getAlgebraicEightQueensConfiguration(boardConfig);
    }
    else 
      alert("Se han dibujado todas las posibles soluciones para el método elegido.")
  }

  /* istanbul ignore next */
  /**
   * @description Método que recibe la configuración inicial de una partida de
   * ajedrez desde el controller y es pasada al view para que sea pintada en el
   * canvas.
   */
  startChessPieces() {
    this.initializeBoard();
    let boardConfig = this.chessController_.playChess();
    this.chessView_.updateBoard(boardConfig);
  }
}


/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.ChessModel = ChessModel;
}