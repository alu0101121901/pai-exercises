/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 10 PAI - Projectile
 * @file projectile-graph.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 25/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase ProjectileGraph, cuya 
 * funcionalidad es representar la trayectoria de un proyectil
 * en una gráfica.
 */


"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassProjectile, ClassGraph;

if (typeof require !== 'undefined') {
  ClassGraph = require('./graph.js').Graph;
  ClassProjectile = require('./throw-projectile.js').Projectile;
}
else {
  ClassProjectile = Projectile;
  ClassGraph = Graph;
}


/**
 * @class ProjectileGraph
 * @extends ClassGraph
 * @description Clase que hereda de la clase Gráfica, donde la diferencia
 * radica en que ésta incorpora el recorrido de un proyectil.
 */
class ProjectileGraph extends ClassGraph {
  /**
   * 
   * @param {Object} CANVAS Canvas 
   * @param {Object} CTX Contexto del canvas
   * 
   */
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
    this.scaleValue_ = 0;
  }
  
  /**
   * @description Método que, una vez se calcula la escala, dibuja en la
   * gráfica, escribirá en el canvas números con los que poder identificar
   * de mejor manera la distancia total del proyectil.
   */
  drawGridNumbersWithScale() {
    // Meterá numeros escalados en las LongLine de la Gráfica
    let LargeLineDistance = this.width_ / 7;
    let accLarge = LargeLineDistance;
    while (accLarge < this.width_) {
      this.ctx_.fillStyle = 'grey';
      this.ctx_.font = "12px Times New Roman";
      this.ctx_.fillStyle = 'black';
      let valuex = Math.floor(accLarge * (1 / this.scaleValue_) * 100) / 100;
      this.ctx_.fillText(`${valuex.toFixed(0)}`, accLarge, 25);
      this.ctx_.fillText(`${valuex.toFixed(0)}`, -25, -(accLarge + 5));
      accLarge += LargeLineDistance;
    }
  }
  
  /**
   * @description Método que hace un escalado entre las dimensiones del canvas
   * y la distancia total que recorre el primer proyectil lanzado.
   * @returns Valor de la nueva escala.
   */
  calculateScale(projectile) {
    let toScale = projectile.maxDistance();
    toScale += toScale * 0.4;
    this.scaleValue_ = this.width_ / toScale;
  }
  
  /* istanbul ignore next */
  /**
   * @description Método que dibuja la trayectoria del proyectil de la
   * siguiente forma: en primer lugar, obtiene el tiempo máximo que el
   * proyectil permanece en el aire. Este tiempo se divide por 100 para
   * descomponer la trayectoria en dicho número de puntos, almacenándose
   * en deltaTime. Luego, se calcula y se pinta la posición del proyectil
   * cada deltaTime segundos hasta que el sumatorio de todos sea igual 
   * al tiempo máximo.
   */
  drawProjectilePath(projectile, scale, color = 'blue') {
    let totalTime = projectile.totalTime();
    let deltaTime = 0.01;
    let accTime = deltaTime;
    this.ctx_.fillStyle = `${color}`;
    let position = {coordX: 500, coordY:500};
    while ((position.coordY > 0) && (position.coordX < this.width_)) {
      position = projectile.calculatePositionInTime(accTime);
      this.ctx_.fillRect(scale * position.coordX, scale * -position.coordY, 4, 4);
      accTime += deltaTime;

    } 
  }

  
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.ProjectileGraph = ProjectileGraph;
}