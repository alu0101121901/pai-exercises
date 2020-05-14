/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file general-eight-queens.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase GeneralEightQueens, que
 * se encarga de resolver el problema de las 8 reinas siguiendo el 
 * método generalizado.
 */

"use strict";

const BOARD_DIM2 = 8;
const NQUEENS2 = 8;


class GeneralEightQueens {
  constructor() {
    this.eightQueensSolutions_ = [];
  }

  /**
   * @description Método que resuelve el prblema de las 8 reinas
   * @returns Array de soluciones.
   */
  eightQueens() {
    this.solveGeneralEightQueens();
    return this.eightQueensSolutions_;
  }

    /**
   * @description Método que lleva inicializa la resolución del problema.
   */
  solveGeneralEightQueens() {
    let boardContainer = []; 
  
    for (let boardIterator = 0; boardIterator < BOARD_DIM2; boardIterator++) {
      boardContainer.push(-1);
    }
    this.setQueen(boardContainer, 0,  NQUEENS2);
  }

  /**
   * @description Función que devolverá true si la reina a evaluar cumple los requisitos
   *        para que sea válida en el tablero, y false en caso contrario.
   * @param {array} board Contenedor de tamaño N que en la posición i almacena la
   *                      fila del tablero donde se situaría una reina.
   * @param {int} queensOnBoard Número de reinas que ya se encuentran en el tablero
   * @param {int} currentRow Valor de la fila del tablero que se va a evaluar.
   */
  isValidQueen(board, queensOnBoard, currentRow) {
    if (this.isFreeDiagonal(board, currentRow, queensOnBoard) &&
    this.isFreeRow(board, currentRow) && this.isFreeLine(board, queensOnBoard, currentRow))
      return true;
    return false;
  }

  /**
   * @description Función que se llama recursivamente hasta que se tienen N reinas en
   *        en el tablero.
   * @param {array} board Contenedor de tamaño N que en la posición i almacena la
   *                      fila del tablero donde se situaría una reina.
   * @param {int} queensOnBoard Número de reinas que ya se encuentran en el tablero
   * @param {int} nQueensToObtain Número de reinas objetivo.
   */
  setQueen(board, queensOnBoard, nQueensToObtain) {
    for (let currentRow = 0; currentRow < board.length; currentRow++) {
      if (this.isValidQueen(board, queensOnBoard, currentRow)) {
        board[queensOnBoard] = currentRow;
        if (!this.isSolution(board, queensOnBoard, nQueensToObtain))
          this.setQueen(board, queensOnBoard + 1, nQueensToObtain);
      }
    }
    board[queensOnBoard] = -1;
}

  /**
  * @description Función que se encarga de comprobar si el tablero tiene una confi-
  *        guración de N reinas.
  * @param {array} board Contenedor de tamaño N que en la posición i almacena la
  *                      fila del tablero donde se situaría una reina.
  * @param {int} queensOnBoard Número de reinas que ya se encuentran en el tablero
  * @param {const int} nQueensToObtain Número de reinas objetivo.
  */
  isSolution (board, queensOnBoard, nQueensToObtain) {
    if (queensOnBoard < nQueensToObtain - 1) {
      return false;
    }
    else {
      this.pushSolution(board);
      return true;
    }
  }

    /**
   * @description Función que comprueba que la reina a valorar no se encuentre en dia-
   *        gonal con otra que esté en el tablero.
   *        Se recorren tanto la diagonal derecha superior como inferior.
   * @param {array} board Contenedor de tamaño N que en la posición i almacena la
   *                  fila del tablero donde se situaría una reina.
   * @param {int} currentRow Valor de la fila del tablero que se va a evaluar.
   * @param {int} queensOnBoard Número de reinas que ya se encuentran en el tablero.
   */
  isFreeDiagonal(board, currentRow, queensOnBoard) {
    for (let iter = 0; iter < queensOnBoard;  iter++) {
      let rowPosition = board[iter];
      let currentDiagonal = 0;
      while (((currentDiagonal + rowPosition) < board.length) || (rowPosition - currentDiagonal >= 0)) {
        if (((currentDiagonal + rowPosition) === currentRow) && 
          (iter + currentDiagonal === queensOnBoard)) {
          return false;
        }
        if (((rowPosition - currentDiagonal) === currentRow) && 
          ((iter + currentDiagonal) === queensOnBoard)) {
          return false;
        }
        currentDiagonal++;
      }
    }
    return true;
  }

    /**
   * @description Se recorre el tablero, si ninguna columna contiene la fila pasasa
   *        por parámetro, quiere decir que la fila es válida.
   * @param {array} board Contenedor de tamaño N que en la posición i almacena la
   *                  fila del tablero donde se situaría una reina.
   * @param {int} currentRow Valor de la fila del tablero que se va a evaluar.
   */
  isFreeRow(board, currentRow) {
    for (let iteratorOfBoard = 0; iteratorOfBoard < board.length; iteratorOfBoard++)
      if (board[iteratorOfBoard] === currentRow)
        return false;
    return true;
  }

    /**
   * @description Método que almacena el array de las soluciones una solución
   * @param {Array} board Array
   */
  pushSolution(board) {
    let boardOnCopy = board.slice();
    this.eightQueensSolutions_.push(boardOnCopy);
  }

  printBoardSolution(board) {
    let toPrint = "";
    for (let boardColIter = 0; boardColIter < board.length; boardColIter++) {
      toPrint = "";
      for (let boardRowIter = 0; boardRowIter < board.length; boardRowIter++) {
        if (boardColIter !== board[boardRowIter])
          toPrint += '. ';
        else
          toPrint += 'Q ';
      }
      console.log(toPrint);
    }
    console.log('\n');
  }

  /**
   * @description Función que comprueba, obteniendo la ecuación de la recta de 
   *        dos reinas ya situadas en el tablero, si una tercera reina se
   *        encuentra en dicha recta.
   * @param {array} board Contenedor de tamaño N que en la posición i almacena la
   *                  fila del tablero donde se situaría una reina.
   * @param {int} queensOnBoard  Número de reinas que ya se encuentran en el tablero.
   * @param {int} currentRow Valor de la fila del tablero que se va a evaluar.
   */
  isFreeLine(board, queensOnBoard, currentRow) {
    let point1 = {x: 0, y: 0};
    let point2 = {x: 0, y: 0};
    let pointToCheck = {x: queensOnBoard, y: currentRow};
    for (let firstBoardPoint = 0; firstBoardPoint <= queensOnBoard; firstBoardPoint++) {
      point1.x = firstBoardPoint;
      point1.y = board[firstBoardPoint];
      for (let secondBoardPoint = firstBoardPoint + 1; secondBoardPoint <= queensOnBoard; secondBoardPoint++) {
        point2.x = secondBoardPoint;
        point2.y = board[secondBoardPoint];
        if (this.isPointInLine(pointToCheck, this.lineFromTo(point1, point2)))
          return false;
      }
    }
    return true;
  }

  /**
 * @description Función que, dados dos puntos, devuelve los parámetros de la recta
 *        que pasa por ambos puntos.
 * @param {Objeto Point} point1 Par con coordenadas x e y.
 * @param {Objeto Point} point2 Par con coordenadas x e y.
 */

  lineFromTo(point1, point2) {
    let line = {m: 0, b: 0};
    // Primero, calculamos la pendiente m de la recta: modelo pto-pte => y2 - y1 = m(x2 - x1)
    line.m = (point2.y - point1.y) / (point2.x - point1.x);

    // Calculamos ahora la variable independiente 'b'
    line.b = -(line.m * point1.x) + point1.y;
    return line;
}

  /**
   * @description Función que indica si un punto 'point' está en la recta 'recta'
   * @param {*} pointToCheck
   * @param {*} line 
   */
  isPointInLine(pointToCheck, line) {
    // y = mx + b
    let y_coord = line.m * pointToCheck.x + line.b;
    if (y_coord === pointToCheck.y)
      return true;
    return false;
  }  
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.GeneralEightQueens = GeneralEightQueens;
}