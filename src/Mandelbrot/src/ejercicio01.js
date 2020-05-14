/** Universidad de La Laguna
   Escuela Superior de Ingeniería y Tecnología
   Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas
   Curso: 3º
   Práctica 7 PAI - Funciones
   @author Rafael Cala González
   Correo: alu0101121901@ull.es
   @since 31/03/2020
   @description Programa que se encarga de dibujar en el canvas una señal 
   de tráfico de Prohibido el paso.
*/

"use strict";

/**
 * @description Función que invoca 1 a 1 las formas necesarias
 * para representar la señal de Prohibido el paso.
 * @param {Object} CTX Contexto del canvas
 * @param {Object} CANVAS Identificador del canvas
 */
function drawSign(CTX, CANVAS) {
  // Circulo rojo
  let radiusRedCircle = CANVAS.width * 0.40;
  drawCircle(CTX, CANVAS.width / 2, CANVAS.height / 2, radiusRedCircle, 0, Math.PI*2, "red");
  // Linea blanca
  drawLine(CTX, CANVAS.width / 2, CANVAS.height / 2, radiusRedCircle - 10, 0, Math.PI*2);
  // Rectángulo del centro
  drawRect(CTX, CANVAS.width / 4, CANVAS.height / 2 * 0.9, CANVAS);
}

/**
 * @description Función que dibuja un rectángulo blanco
 * en el centro del círculo.
 * @param {Object} CTX Contexto del canvas
 * @param {Number} px Coordenada x
 * @param {Number} py Coordenada y
 * @param {Object} CANVAS Identificador del canvas
 */
function drawRect(CTX, px, py, CANVAS) {
  CTX.beginPath();
  CTX.fillStyle = 'white';
  CTX.rect(px, py, CANVAS.width * 0.5 , CANVAS.height * 0.12, 15);
  CTX.stroke();
  CTX.fill();
}

/**
 * @description Función que se encarga de dibujar la línea blanca
 * de la señal de prohibido el paso.
 * @param {Object} CTX Contexto del canvas
 * @param {Number} px Coordenada x
 * @param {Number} py Coordenada y
 * @param {Number} radius Radio del círculo
 * @param {Number} start Punto desde el que se empieza a trazar
 * el arco.
 * @param {Number} end Punto en el que se termina de trazar el arco.
 */
function drawLine(CTX, px, py, radius, start, end) {
  CTX.beginPath();
  CTX.arc(px, py, radius, start, end);
  CTX.lineWidth = 5;
  CTX.strokeStyle = '#FFFFFF';
  CTX.stroke();
}

/**
 * @description Función que dibuja el círculo rojo de la señal de prohibido
 * el paso.
 * @param {Object} CTX Contexto del canvas
 * @param {Number} px Coordenada x
 * @param {Number} py Coordenada y
 * @param {Number} radius Radio del círculo
 * @param {Number} start Punto desde el que se empieza a trazar
 * el arco.
 * @param {Number} end Punto en el que se termina de trazar el arco.
 * @param {String} color Color con el que se quiere dibujar el círculo
 */
function drawCircle(CTX, px, py, radius, start, end, color) {
  CTX.beginPath();
  CTX.arc(px, py, radius, start, end);
  CTX.fillStyle = `${color}`;
  CTX.fill();
  CTX.stroke();
}

/**
 * @description Función que es invocada desde el HTML y ejecuta las funciones
 * necesarias para el funcionamiento del ejercicio.
 */
function main() {
  const CANVAS = document.getElementById("ejercicio");
  if(CANVAS.getContext) {
    const CTX = CANVAS.getContext('2d');
    drawSign(CTX, CANVAS);
  }

}