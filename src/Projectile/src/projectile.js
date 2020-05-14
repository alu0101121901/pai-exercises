/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 10 - Projectile
 * @file projectile.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 25/04/20
 * @version 1.0.0
 * @description Fichero que contiene las funciones principales para 
 * el funcionamiento de la práctica.
 */


"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassProjectile2, ClassProjectileGraph, ClassOutput;

if (typeof require !== 'undefined') {
  ClassProjectile2 = require('./throw-projectile.js').Projectile;
  ClassProjectileGraph = require('./projectile-graph.js').ProjectileGraph;
  ClassOutput = require('./output.js').Output;
}
else {
  ClassProjectile2 = Projectile;
  ClassProjectileGraph = ProjectileGraph;
  ClassOutput = Output;
}

/**
 * Variables globales para el funcionamiento del programa.
 */
let firstTime = true;
let scaleValue;

/**
 * @description Función que comprueba si la velocidad y el ángulo
 * pasados por el input son válidos.
 * @param {number} vel Valor de la velocidad
 * @param {number} angle Valor del ángulo
 * @returns True si son válidos, False en otro caso.
 */
function isValidInput(vel, angle) {
  if (vel > 0 && (angle > 0 && angle < 90))
    return true;
  return false;
}

/* istanbul ignore next */
/**
 * @description Función que se activa al clickarse el botón de LANZAR PROYECTIL
 * . Inicializa los canvas, lee los datos de entrada y con ellos crea un objeto
 * proyectil. Dependiendo de si el checkbox está activado o no, dibujará la 
 * trayectoria en una gráfica e imprimirá algunos valores en el segundo canvas
 * o solo lo segundo.
 */
function getInputValue() {

  const CANVAS_PROJECTILES = document.getElementById("parte1");
  const CONTEXT_PROJECTILES = CANVAS_PROJECTILES.getContext("2d");
  const CANVAS_OUTPUT = document.getElementById("parte2");
  const CONTEXT_OUTPUT = CANVAS_OUTPUT.getContext('2d');

  const PROJECTILE_GRAPH = new ClassProjectileGraph(CANVAS_PROJECTILES, CONTEXT_PROJECTILES);

  // Leemos los valores de velocidad y angulo desde el html
  let inputVelocity = document.getElementById("velocity").value;
  let inputAngle = document.getElementById("angle").value;
  let inputFriction = parseFloat(document.getElementById("rozamiento").value);
  let drawFlag = document.getElementById("cb");
  console.log(inputVelocity);
  console.log(inputAngle);
  console.log(inputFriction);
  if(isValidInput(inputVelocity, inputAngle)) {
    
    const PROYECTIL = new ClassProjectile2(inputVelocity, inputAngle, inputFriction);

    // Si el checkbox esta activo, dibujamos la gráfica y su trayectoria.
    if (drawFlag.checked) { // Comprobar que velocidad y angulo son adecuados.
      if(firstTime) {
        PROJECTILE_GRAPH.draw();
        firstTime = false;
        PROJECTILE_GRAPH.calculateScale(PROYECTIL);
        PROJECTILE_GRAPH.drawGridNumbersWithScale();
        scaleValue = CANVAS_PROJECTILES.width / (PROYECTIL.maxDistance() * 1.4);
      }
      if (inputFriction > 0)
        PROJECTILE_GRAPH.drawProjectilePath(PROYECTIL, scaleValue, `blue`);
      else
        PROJECTILE_GRAPH.drawProjectilePath(PROYECTIL, scaleValue, `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
    } 
    const OUTPUT_RESULTS = new ClassOutput(CANVAS_OUTPUT, CONTEXT_OUTPUT, PROYECTIL);
    OUTPUT_RESULTS.writeResults(); 
  }
  else
    alert("Los parámetros pasados no son válidos.\nLa velocidad debe ser mayor que 0\nEl ángulo debe estar entre 1 y 90");
  
}

function getInputValueEJ1() {

  const CANVAS_PROJECTILES = document.getElementById("parte1");
  const CONTEXT_PROJECTILES = CANVAS_PROJECTILES.getContext("2d");
  const CANVAS_OUTPUT = document.getElementById("parte2");
  const CONTEXT_OUTPUT = CANVAS_OUTPUT.getContext('2d');

  const PROJECTILE_GRAPH = new ClassProjectileGraph(CANVAS_PROJECTILES, CONTEXT_PROJECTILES);

  // Leemos los valores de velocidad y angulo desde el html
  let inputVelocity = document.getElementById("velocity").value;
  let inputAngle = 5;
  let drawFlag = document.getElementById("cb");
  console.log(inputVelocity);
  console.log(inputAngle);
  
    if(isValidInput(inputVelocity, inputAngle)) {
      const PROYECTIL = new ClassProjectile2(inputVelocity, 45);

      // Si el checkbox esta activo, dibujamos la gráfica y su trayectoria.
      if (drawFlag.checked) { // Comprobar que velocidad y angulo son adecuados.
        if(firstTime) {
          PROJECTILE_GRAPH.draw();
          firstTime = false;
          PROJECTILE_GRAPH.calculateScale(PROYECTIL);
          PROJECTILE_GRAPH.drawGridNumbersWithScale();
          scaleValue = CANVAS_PROJECTILES.width / (PROYECTIL.maxDistance() * 1.4);
        }
        PROJECTILE_GRAPH.drawProjectilePath(PROYECTIL, scaleValue, 'blue');
        for (let currentProyectil = inputAngle; currentProyectil <= 35; currentProyectil += 10) {
          const PROYECTIL = new ClassProjectile2(inputVelocity, currentProyectil);
          PROJECTILE_GRAPH.drawProjectilePath(PROYECTIL, scaleValue, `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
        }
        
      } 
      const OUTPUT_RESULTS = new ClassOutput(CANVAS_OUTPUT, CONTEXT_OUTPUT, PROYECTIL);
      OUTPUT_RESULTS.writeResults(); 
    }
    else
      alert("Los parámetros pasados no son válidos.\nLa velocidad debe ser mayor que 0\nEl ángulo debe estar entre 1 y 90");
}
    

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.isValidInput = isValidInput;
}