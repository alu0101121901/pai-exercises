/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 10 PAI - Projectile
 * @file throw-projectile.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 25/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Projectile, cuya funcionalidad
 * es representar a un propio proyectil tras aplicarle un tiro parabólico.
 * Se apoya en las ecuaciones de movimiento del movimiento parabólico para
 * llevar a cabo sus cálculos.
 */

"use strict";

/**
 * Valor cte de la aceleración de la gravedad.
 */
const ACCELERATION = 9.8;

/**
 * @class Projectile
 * @constructor Recibe la velocidad y el ángulo de disparo del proyectil, 
 * con el calcula la velocidad en el eje x y la del eje y.
 * @description Método que representa un proyectil y todos los cálculos
 * asociados a éste.
 */
class Projectile {
  constructor(velocity, angle, rozamiento = 0) {
    this.rozamiento_ = rozamiento;
    this.velocity_ = velocity;
    this.angle_ = angle;
    this.velocityX_ = velocity * Math.cos((this.angle_ * Math.PI) / 180);
    this.velocityY_ = velocity * Math.sin((this.angle_ * Math.PI) / 180);
  }

  /**
   * @description Método que calcula el tiempo que tarda el proyectil en
   * alcanzar su altura máxima.
   */
  timeRaising () {
    return (-this.velocityY_ / -ACCELERATION);
  }
  
  /**
   * @description Método que calcula el tiempo que dura el proyectil en el 
   * aire. Para ello, multiplica por dos el tiempo que tarda el proyectil
   * en alcanzar el punto máximo de altura.
   * @returns Tiempo del proyectil en el aire.
   */
  totalTime() {
    // if (this.rozamiento_ !== 0)
       // return (- (1 / this.rozamiento_)) * Math.log(1 - (rb / this.velocityX_));
    return 2 * this.timeRaising();
  }
  
  /**
   * @description Método que calcula la altura máxima que alcanza el
   * proyectil en el aire.
   * @returns Altura máxima del proyectil
   */
  maxHeight () {
    if (this.rozamiento_ !== 0) {
      return (this.velocityY_ / this.rozamiento_) - (ACCELERATION / Math.pow(this.rozamiento_, 2)) * (Math.log(1 + ((this.rozamiento_ * this.velocityY_) / ACCELERATION)));
    }
    const velSquare = Math.pow(this.velocity_, 2);
    const sinAngleSquare = Math.pow(Math.sin(Math.PI * this.angle_ / 180), 2);
    const numerator = velSquare * sinAngleSquare;
    const den = 2 * ACCELERATION;
    const result = numerator / den ;
    return result;
  }

  /**
   * @description Método que calcula la distancia máxima que permanece el
   * proyectil en el aire.
   * @returns Distancia máxima
   */
  maxDistance() {
    return (Math.pow(this.velocity_, 2) * Math.sin(2 * ((this.angle_ * Math.PI) / 180))) / ACCELERATION;
  }

  /**
   * @description Método que calcula la posición del proyectil en un tiempo
   * deltaTime usando la ecuación de posición de ambos ejes.
   * @param {Number} deltaTime Segundos
   * @returns Objeto con coordenadas X e Y
   */
  calculatePositionInTime (deltaTime) {
    let position = {coordX: 0, coordY: 0};
    if (this.rozamiento_ === 0) {
      position.coordX = this.velocityX_ * deltaTime;
      position.coordY = (this.velocityY_ * deltaTime) - (0.5 * ACCELERATION * Math.pow(deltaTime, 2));
    }
    else {
      position.coordX = (this.velocityX_ / this.rozamiento_) * (1 - Math.exp(-this.rozamiento_ * deltaTime));
      position.coordY = (1 / this.rozamiento_) * (ACCELERATION + this.velocityY_) * (1 - Math.exp(-this.rozamiento_ * deltaTime)) - ((ACCELERATION / this.rozamiento_) * deltaTime);
    }
    return position;
  }
}
/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Projectile = Projectile;
  exports.Projectile2 = Projectile;
}