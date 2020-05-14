/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file matrix.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Matrix, cuya funcionalidad
 * es almacenar un tipo de dato en un array de tamaño m * n.
 */

/**
 * @class Matrix
 * @description Método que almacena un tipo de dato en un array de tamaño
 * m * n;
 */
class Matrix {
  /**
   * @description Método que recibe un número de filas y columnas para la
   * matriz, con las que redimensiona el array que tiene como atributo 
   * privado. Así mismo, el número de filas y columnas también quedan
   * almacenados como atributos.
   * @param {Number} rows 
   * @param {Number} columns 
   */
  constructor(rows, columns) {
    this.matrix_ = new Array(rows * columns);
    this.rows_ = rows;
    this.columns_ = columns;
  }

  /**
   * @description Método que devuelve el valor almacenado en la posición
   * (i, j) de la matriz.
   * @param {Number} i índice de la fila
   * @param {Number} j índice de la columna
   * @returns Variable
   */
  getData(i, j) {
    return this.matrix_[i * this.columns_ + j];
  }

  /**
   * @description Método que almacena en la posición (i, j) un tipo de dato.
   * @param {Number} i índice de la fila
   * @param {Number} j índice de la columna
   * @param {} data Tipo de dato.
   */
  setPosition(i, j, data) {
    this.matrix_[i * this.columns_ + j] = data;
  }

  /**
   * @description Método que devuelve el número de filas.
   * @returns Número de filas
   */
  get rows() {
    return this.rows_;
  }

  /**
   * @description Método que devuelve el número de filas.
   * @returns Número de filas
   */
  get cols() {
    return this.columns_;
  }
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Matrix = Matrix;
}