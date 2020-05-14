/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 12 PAI - Life
 * @file graphic-object.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 12/05/20
 * @version 1.0.0
 * @description Fichero que contiene el programa principal del ejercicio
 * de modificacion de la practica 12.
 */

"use strict";

let ClassGraphicObject;
if (typeof require !== 'undefined') {
  ClassGraphicObject = require('../ejercicio/graphic-object').GraphicObject;
  // ClassCircle = require('../../src/painter.js').Circle;
}
else {
  ClassGraphicObject = GraphicObject;
  // ClassCircle = Circle;
}

const CANVAS_GOBJECT = document.getElementById("graphic-object");
const CTX_GOBJECT = CANVAS_GOBJECT.getContext("2d");
const GRAPHIC_OBJECT = new ClassGraphicObject(CANVAS_GOBJECT, CTX_GOBJECT);


const NORTH_BUTTON = document.getElementById("north");
NORTH_BUTTON.addEventListener('click', north);
const SOUTH_BUTTON = document.getElementById("south");
SOUTH_BUTTON.addEventListener('click', south);
const WEST_BUTTON = document.getElementById("west");
WEST_BUTTON.addEventListener('click', west);
const EAST_BUTTON = document.getElementById("east");
EAST_BUTTON.addEventListener('click', east);

/**
 * @description Método que mueve el objeto gráfico 5 píxeles al norte
 */
function north() {
  const PIXELS_OFFSET = document.getElementById("number").value;
  const NEW_TEXT = document.getElementById("nPixeles");
  GRAPHIC_OBJECT.move(0, PIXELS_OFFSET);
  NEW_TEXT.textContent = `Numero de píxeles que se desplaza: ${PIXELS_OFFSET}`;
}

/**
 * @description Método que mueve el objeto gráfico 5 píxeles al sur
 */
function south() {
  const PIXELS_OFFSET = document.getElementById("number").value;
  const NEW_TEXT = document.getElementById("nPixeles");
  GRAPHIC_OBJECT.move(0, -PIXELS_OFFSET);
  NEW_TEXT.textContent = `Numero de píxeles que se desplaza: ${PIXELS_OFFSET}`;
}

/**
 * @description Método que mueve el objeto gráfico 5 píxeles al Oeste
 */
function west() {
  const PIXELS_OFFSET = document.getElementById("number").value;
  const NEW_TEXT = document.getElementById("nPixeles");
  GRAPHIC_OBJECT.move(-PIXELS_OFFSET, 0);
  NEW_TEXT.textContent = `Numero de píxeles que se desplaza: ${PIXELS_OFFSET}`;
}

/**
 * @description Método que mueve el objeto gráfico 5 píxeles al este
 */
function east() {
  const PIXELS_OFFSET = parseInt(document.getElementById("number").value);
  let value = 0;
  value = value + PIXELS_OFFSET;
  const NEW_TEXT = document.getElementById("nPixeles");  
  GRAPHIC_OBJECT.move(PIXELS_OFFSET, 0);
  NEW_TEXT.textContent = `Numero de píxeles que se desplaza: ${parseInt(PIXELS_OFFSET)}`;
}

/**
 * @description Método que inicializa el objeto gráfico, situándolo en el centro.
 */
function main () {
  GRAPHIC_OBJECT.initialize();
}

main();