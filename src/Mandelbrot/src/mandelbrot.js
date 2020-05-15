/** Universidad de La Laguna
   Escuela Superior de Ingeniería y Tecnología
   Grado en Ingeniería Informática
  Programación de Aplicaciones Interactivas
   Curso: 3º
   Práctica 7 PAI - Funciones
   @author Rafael Cala González
   Correo: alu0101121901@ull.es
   @since 31/03/2020
   @description Programa que se encarga de representar gráficamente el conjunto
   de Mandelbrot y de, dado un número N de puntos escrito por el prompt, se ge-
   neran N números complejos, cuyos valores estarán acotados a un intervalo da-
   do. Así, a estos N números se les aplica la representación de Monte Carlo,
   de modo que calculará cual de estos puntos pertenece al conjunto de Mandel-
   brot y cual no, para posteriormente calcular su área y error.
*/

"use strict";
const MAX_ITER = 10000;


// ---------- Clase Numero Complejo ---------------

/**
 * @description Clase que representa un numero complejo, que se caracteriza
 * por tener una parte real y una parte imaginaria.
 */
class ComplexNumber {
  constructor(realPart, complexPart) {
    this.realPart_ = realPart;
    this.complexPart_ = complexPart;
  }
  // ----------Setters y getters-------------

  set realPart (value) {
    this.realPart_ = value;
  }

  set complexPart(value) {
    this.complexPart_ = value;
  }

  get realPart() {
    this.realPart_;
  }

  get complexPart() {
    this.complexPart_;
  }

  // ----------Operaciones de números complejos-----------

  add(toAdd) {
    let addedReal = this.realPart_ + toAdd.realPart_;
    let addedComplex = this.complexPart_ + toAdd.complexPart_;
    return new ComplexNumber(addedReal, addedComplex);
  }

  square() {
    let squaredReal = this.realPart_ * this.realPart_ 
                      - this.complexPart_ * this.complexPart_;
    let squaredComplex = 2 * this.realPart_ * this.complexPart_;
    return new ComplexNumber(squaredReal, squaredComplex);
  }

  module() {
    return Math.round((Math.sqrt(Math.pow(this.realPart_, 2)
     + Math.pow(this.complexPart_, 2))) * 1000) / 1000;
  }
}

// ------------ Algoritmo de Mandelbrot ---------------

/**
 * @description Función que dibuja en cada punto del canvas un punto, cuyo color
 * variará en función de si está en el conjunto de mandelbrot o no.
 * Este color se obtiene del número de iteraciones calculado por el algoritmo de
 * Mandelbrot.
 * @param {Object} CTX Contexto del canvas
 * @param {*} CANVAS Identificador del canvas
 */
function drawMandelbrotOnCanvas(CTX, CANVAS) {
 let toScale = 280;
 let xDisp = 1.5;
 let yDisp = 1.05;
 let iterationsNumber = 0;

 for (let x = 0; x < CANVAS.width; x++) {
   for (let y = 0; y < CANVAS.height; y++) {
     let complex = new ComplexNumber(x / toScale - xDisp,
                                     y / toScale - yDisp);                             
     iterationsNumber = mandelbrotAlgorithm(complex);
     drawPoint(CTX, iterationsNumber, x, y);
   }
 }
}


function drawPoint(CTX, iterationsNumber, px, py) {
  const lightness = ((iterationsNumber < MAX_ITER) ? iterationsNumber / MAX_ITER * 100 + 15 : 0);
  const hue = (210 * iterationsNumber / MAX_ITER);
 
  CTX.fillStyle = 'hsl(' + hue +', 100%,' + lightness + '%)';
  CTX.fillRect(px, py, 1, 1);
}

/**
 * Función que itera el calculo de Mandelbrot hasta que el número sea mayor
 * que un umbral o se den un número n de iteraciones.
 * @param {Object} complexNumber Numero complejo
 * @returns Número de iteraciones
 */
function mandelbrotAlgorithm(complexNumber) {
  let zModule;
  let zComplex = complexNumber;
  let currentIteration = 0;
  while((currentIteration < MAX_ITER) && (!isGreaterThan(zModule, 2))) {
    // z = z^2 + c
    let zComplexSquared = zComplex.square(); // z^2
    zComplex = zComplexSquared.add(complexNumber); // z = z^2 + c[i]
    currentIteration++;
    zModule = zComplex.module();
    // console.log("|z| = ", zModule);
  }
  return currentIteration;
}

/**
 * Función que itera el algoritmo de Mandelbrot para comprobar si un número
 * complejo c se encuentra en el conjunto. Para ello, se tiene que dar que
 * se cumplan las n iteraciones (10000).
 * @param {Number} complexOnInterval Número complejo que se valora.
 * @returns True si no está en el conjunto, False si no está.
 */
function isOnMandelbrotSet(complexOnInterval) {
  let zModule;
  let zComplex = complexOnInterval;
  let currentIteration = 0;
  while((currentIteration < MAX_ITER)) {
    let zComplexSquared = zComplex.square(); // z^2
    zComplex = zComplexSquared.add(complexOnInterval); // z = z^2 + c[i]
    currentIteration++;
    zModule = zComplex.module();
 
    if (isGreaterThan(zModule, 2))
      return true;
  }
  return false;
}

/**
 * Funcion que comprueba si un número es mayor que otro
 * @param {Number} absComplexNumber Módulo de un número complejo
 * @param {Number} umbral Valor umbral que se compara
 * @returns True si es mayor que el umbral, False en otro caso.
 */
function isGreaterThan(absComplexNumber, umbral) {
  if (absComplexNumber > umbral)
    return true;
  return false;
}

/**
 * @description Función que se encarga de generar números aleatorios en un
 * intervalo dado.
 * @param {Object} from Punto delimitador izquierdo
 * @param {Object} to Punto delimitador derecho
 * @returns Array que contiene todos los puntos generados.
 */
function generatePointsBetween(fromR, toR, fromI, toI) {
  let real = Math.random() * (toR - fromR) + fromR;
  let complex = Math.random() * (toI - fromI) + fromI;
  return new ComplexNumber(real, complex);
}

/**
 * @description Método que lleva a cabo la representación de Monte Carlo
 *              del Conjunto de Mandelbrot.
 *              Esto es, dado un intervalo de números complejos, generar
 *              N números complejos aleatorios, aplicarles el algoritmo
 *              de Mandelbrot para comprobar si se encuentran dentro de
 *              dicho conjunto y calcular el área del conjunto.
 * @param {Number} complexNumberContainer Numero de números complejos que se
 *                                        generan aleatoriamente.
 */
function monteCarloRepresentation(complexNumberContainer, CTX) {
  let nInside = 0;
  const RE_FIRST = -2;
  const RE_SECOND = 0.5;
  const IM_FIRST = 0;
  const IM_SECOND = 1.125;
  for (let currentComplex = 0; currentComplex < complexNumberContainer; currentComplex++) {
    let randomComplexPoint = generatePointsBetween(RE_FIRST, RE_SECOND, IM_FIRST, IM_SECOND);
    if (!isOnMandelbrotSet(randomComplexPoint))
      nInside++;
  }
  calculateAreaAndError(complexNumberContainer, nInside, CTX);   
}

/**
 * @description Función que calcula el área y el error del conjunto de
 * Mandelbrot e imprime sus valores por consola.
 * @param {number} nPoints Número de puntos generados en el contenedor
 * @param {number} nInside Número de puntos que entraron dentro de la 
 * representación de Monte Carlo 
 */
function calculateAreaAndError(nPoints, nInside, CTX) {
  
  const AREA = 2 * 2.5 * 1.125 * nInside / nPoints;
  const ERROR = AREA / Math.sqrt(nPoints);

  printTextOnCanvas(CTX, "Area: ", AREA, 40, 40);
  printTextOnCanvas(CTX, "Error: ", ERROR, 40, 60);

}

/**
 * @description Función que se encarga de imprimir en el canvas un texto dado.
 * @param {Object} CTX Contexto del canvas
 * @param {String} text Texto descriptivo de lo que se quiere imprimir
 * @param {Number} value Valor que se imprime
 * @param {*} px Coordenada X del punto que se quiere imprimir
 * @param {*} py Coordenada Y del punto que se quiere imprimir
 */
function printTextOnCanvas(CTX, text, value, px, py) {
  CTX.font = 'bold 15pt Calibri';
  CTX.fillStyle = "black";
  CTX.fillText(`${text} ${value}`,px, py);
}

// ------------ Función principal -----------------
/**
 * @description Función que es invocada desde el HTML y ejecuta las funciones
 * necesarias para el funcionamiento de la práctica, calculando la duración
 * del tiempo de ejecución.
 */
function main() {
  let NPOINTS_ = prompt("Numero de puntos a generar: ", "500");
  const CANVAS_ = document.getElementById("mandelbrot");
  if(CANVAS_.getContext) {
    const CTX_ = CANVAS_.getContext('2d');
    monteCarloRepresentation(NPOINTS_, CTX_);
    drawMandelbrotOnCanvas(CTX_, CANVAS_);
  }
}

const CANVAS = document.getElementById("mandelbrot");
const CTX = CANVAS.getContext('2d');

function representation() {
  CTX.clearRect(0, 0, 340, 100);
  let NPOINTS_ = parseInt(document.getElementById("puntos").value);
  monteCarloRepresentation(NPOINTS_, CTX);
}

function draw () {
  drawMandelbrotOnCanvas(CTX, CANVAS);
}