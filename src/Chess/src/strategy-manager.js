/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11 PAI - Chess
 * @file strategy-manager.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 01/05/20
 * @version 1.0.0
 * @description Fichero que contiene la clase StrategyManager, que
 * actúa como interfaz del patrón Estrategia. En este caso, apuntará
 * a un algoritmo que resuelve el problema de las 8 reinas.
 */

"use strict";


/**
 * @class StrategyManager
 * @description actúa como interfaz del patrón Estrategia. En este caso, 
 * apuntará a un algoritmo que resuelve el problema de las 8 reinas.
 */
class StrategyManager {
  /**
   * @description Inicializa el puntero estrategia a null.
   */
  constructor () {
    this._strategy = null;
  }
  /**
   * @description Set del puntero estrategia
   */
  set strategy(strategy) {
    this._strategy = strategy;
  }

  /**
   * @description Get del puntero estrategia
   * @returns Valor del puntero estrategia.
   */
  get strategy() {
    return this._strategy;
  }

  /**
   * @description Método que resuelve el 8 reinas clásico o generalizado
   * dependiendo de a donde apunte el puntero estrategia.
   * @returns Array de soluciones.
   */
  eightQueens() {
    return this._strategy.eightQueens();
  }
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.StrategyManager = StrategyManager;
}

