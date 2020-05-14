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
let ClassStrategyManager, ClassClassicEightQueens, ClassGeneralEightQueens, ClassMatrix;

if (typeof require !== 'undefined') {
  ClassStrategyManager = require('../src/strategy-manager.js').StrategyManager;
  ClassClassicEightQueens = require('../src/classic-eight-queens.js').ClassicEightQueens;
  ClassGeneralEightQueens = require('../src/general-eight-queens.js').GeneralEightQueens;
  ClassMatrix = require('../src/matrix.js').Matrix;
}
else {
  ClassStrategyManager = StrategyManager;
  ClassClassicEightQueens = ClassicEightQueens;
  ClassGeneralEightQueens = GeneralEightQueens;
  ClassMatrix = Matrix;
}

/**
 * Arrays con las posibles etiquetas que pueden tener la piezas del ajedrez.
 */
const COLOR = ["Black ", "White "];
const FICHAS = ["Tower", "Horse", "Alfil", "Queen", "King", "Peon"];


/**
 * @class ChessController
 * @description Clase cuya funcionalidad es calcular diversas configuraciones
 * de tableros, almacenadas en una matriz.
 */
class ChessController {
  /**
   * @description Constructor de la clase, que inicializa el array de soluciones
   *  y el objeto que utiliza el patrón Estrategia para llevar a cabo un tipo
   * de resolución de 8 reinas.
   */
  constructor() {
    this.eightQueensSolutions_ = [];
    this.eightQueensManager_ = new ClassStrategyManager();
  }

  /**
   * @description Método que dependiendo del valor de eightQueensOption,
   * hace que el puntero de eightQueensManager apunte a la resolución
   * clásica o generalizada del 8 reinas. Finalmente ejecuta el método
   * que lo resuelve, almacenando en el array de soluciones todas las 
   * soluciones generadas.
   * @param {Number} eightQueensOption Valor que es 0 ó 1
   */
  solveEightQueens(eightQueensOption) {
    if(eightQueensOption === 0)
      this.eightQueensManager_.strategy = new ClassClassicEightQueens();
    else
      this.eightQueensManager_.strategy = new ClassGeneralEightQueens();
    this.eightQueensSolutions_ = this.eightQueensManager_.eightQueens();
  }

  get eightQueensSols() {
    return this.eightQueensSolutions_;
  }
  
  /**
   * @description Método que crea una configuración de ajedrez a partir de
   * la n-esima solución de las 8 reinas.
   * @param {Number} currentSolution índice de la solución
   * @returns Matriz con una de las soluciones.
   */
  getASolutionFromEightQueens(currentSolution) {
    if (currentSolution >= this.eightQueensSolutions_.length)
      return -1;
    let boardConfiguration = new ClassMatrix(8, 8);
    let pieza = COLOR[0] + FICHAS[3];
    for (let current = 0; current < 8; current++) {
      boardConfiguration.setPosition(this.eightQueensSolutions_[currentSolution][current], current, pieza);
    }
    return boardConfiguration;
  }

  /**
   * @description Método que crea la configuración del inicio de una partida 
   * de ajedrez.
   * @returns Matriz con la configuración del inicio de una partida de
   * ajedrez
   */
  playChess() {
    let boardConfiguration = new ClassMatrix(8, 8);
    // Colocamos primero los peones
    for (let current = 0; current < 8; current++) {
      boardConfiguration.setPosition(1, current, COLOR[1] + FICHAS[5]);
      boardConfiguration.setPosition(6, current, COLOR[0] + FICHAS[5]);
    }
    // Colocamos el resto de las piezas
    let currentCol = 0;
    for (let current = 0; current < 4; current++) {
      boardConfiguration.setPosition(0, currentCol, COLOR[1] + FICHAS[current]);
      boardConfiguration.setPosition(7, currentCol, COLOR[0] + FICHAS[current]);
      currentCol++;
    }
    let tmp = FICHAS[3];
    FICHAS[3] = FICHAS[4];
    FICHAS[4] = tmp;
    for (let current = 3; current >= 0; current--) {
      boardConfiguration.setPosition(0, currentCol, COLOR[1] + FICHAS[current]);
      boardConfiguration.setPosition(7, currentCol, COLOR[0] + FICHAS[current]);
      currentCol++;
    }

    tmp = FICHAS[3];
    FICHAS[3] = FICHAS[4];
    FICHAS[4] = tmp;
    return boardConfiguration;
  }

}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.ChessController = ChessController;
}