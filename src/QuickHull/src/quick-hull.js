/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * @file quick-hull.js
 * @subject Práctica 6 PAI - QuickHull
 * @author Rafael Cala González
 * Correo: alu0101121901@ull.edu.es
 * @since 23/03/2020
 * @version 1.0.0
 * 
 * @description Programa que genera un número de puntos escrito por teclado, 
 * dibujándolos en un canvas.
 * Posteriormente, ejecuta el algoritmo QuickHull, que calcula la malla convexa
 * formada por los puntos que se encuentran más externos.
 * De este modo, el programa imprime como va quedando la malla convexa cada vez
 * que se actualiza.
*/

"use strict";
/**
 * @description Función que lleva a cabo el algoritmo que calcula
 * la malla convexa formada por los puntos más externos en un plano dado.
 * 1. Busca los puntos más alejados a la izquierda y derecha del plano.
 * 2. Traza una linea recta entre ambos.
 * 3. Ejecuta FindHull para los puntos que quedan a la derecha
 * 4. Ejecuta FindHull para los puntos que quedan a la izquierda
 * @param {Array} pointsContainer Contenedor de puntos
 * @param {Object} CTX Contexto del canvas
 */
async function quickHull(pointsContainer, CTX) {
  let convexHull = [];
  // Encontrar los puntos más a la izquierda y a la derecha del contenedor de puntos.
  let pointA = findFarthestOnLeft(pointsContainer);
  let pointB = findFarthestOnRight(pointsContainer);
  let subSet1 = [];
  let subSet2 = [];

  drawLine(pointA, pointB, CTX);
  await sleep(300);
  convexHull.push(pointB);
  convexHull.push(pointA);

  createSubSets(subSet1, subSet2, pointsContainer, pointA, pointB);

  findHull(subSet1, pointA, pointB, convexHull, CTX, pointsContainer);
  
  findHull(subSet2, pointB, pointA, convexHull, CTX, pointsContainer);

  CTX.clearRect(0, 0, 1200, 800);
  for (let i = 0; i < pointsContainer.length; i++) {
    drawPoint(pointsContainer[i], CTX);
  }
  await sleep (200);
  for (let i = 1; i < convexHull.length; i++) {
    await sleep (200);
    drawLine(convexHull[i - 1], convexHull[i], CTX);
  }
  await sleep (200);
  drawLine(convexHull[convexHull.length - 1], convexHull[0], CTX);
}

/**
 * @description Función recursiva que obtiene el punto más alejado de una recta,
 * lo introduce en el ConvexHull y busca más puntos candidatos llamándose a sí misma,
 * de modo que crea dos rectas con el punto calculado y busca a la derecha de ambas.
 * @param {Object} subSetK Contenedor de puntos
 * @param {Object} pointP Par de coordenadas X e Y
 * @param {Object} pointQ Par de coordenadas X e Y
 * @param {Array} convexHull Contenedor de los puntos del canvas que forman la malla
 * convexa
 * @param {Object} CTX Contexto del canvas
 * @param {Array} pointsContainer Contenedor de puntos
 */
async function findHull (subSetK, pointP, pointQ, convexHull, CTX, pointsContainer) {
  if (subSetK.length === 0)
    return;
  let line = calculateLineEquation(pointP, pointQ);
  let farthestPointC = findFarthestPointToLine(line, subSetK);

  for (let i = 0; i < convexHull.length; i++) {
    if (convexHull[i] === pointP) {
      convexHull.splice(i, 0, farthestPointC);
      i++;
    }
  }
  await sleep(150);
  CTX.clearRect(0, 0, 1200, 800);
  for (let i = 0; i < pointsContainer.length; i++) {
    drawPoint(pointsContainer[i], CTX);
  }
  await sleep (200);
  for (let i = 1; i < convexHull.length; i++) {
    await sleep (200);
    drawLine(convexHull[i - 1], convexHull[i], CTX);
  }
  await sleep (200);
  drawLine(convexHull[convexHull.length - 1], convexHull[0], CTX);

  let lineP_C = calculateLineEquation(pointP, farthestPointC);
  let lineQ_C = calculateLineEquation(farthestPointC, pointQ);

  let subSetKLeft = [];
  let subSetKRight = [];
  createSubSets_(subSetK, subSetKRight, subSetKLeft, lineP_C, lineQ_C);

  findHull(subSetKRight, pointP, farthestPointC, convexHull, CTX, pointsContainer);
  findHull(subSetKLeft, farthestPointC, pointQ, convexHull, CTX, pointsContainer);

}

/**
 * @description Función que se encarga de meter en dos subcontenedores aquellos puntos
 * de un contenedor que queden a la derecha de sus respectivas líneas.
 * @param {Object} subSetK Contenedor de puntos
 * @param {Object} subSetKRight Contenedor de puntos
 * @param {Object} subSetKLeft Contenedor de puntos
 * @param {Object} line1 Ecuación de la recta
 * @param {Object} line2 Ecuación de la recta
 */
function createSubSets_(subSetK, subSetKRight, subSetKLeft, line1, line2) {
  for (let currentPoint = 0; currentPoint < subSetK.length; currentPoint++) {
    isOnRight(subSetK[currentPoint], line2) ?
      subSetKLeft.push(subSetK[currentPoint]) :
      subSetKLeft;

    isOnRight(subSetK[currentPoint], line1) ?
      subSetKRight.push(subSetK[currentPoint]) :
      subSetKRight;
  }
}

/**
 * @description Función que comprueba si un punto está a la derecha de una 
 * recta
 * @param {Object} pointToCheck Par de coordenadas X e Y
 * @param {Object} line Ecuación de la recta
 * @returns True si está a la derecha, False en otro caso.
 */
function isOnRight(pointToCheck, line) {
  if ((pointToCheck.x * line[0] + pointToCheck.y * line[1]) < line[2]) {
    return 1;
  }
  return 0;
}

/**
 * @description Función que calcula el punto más alejado de una recta
 * @param {Object} line Ecuación de una recta
 * @param {Array} subSetK Contenedor de puntos
 * @returns Un objeto punto
 */
function findFarthestPointToLine(line, subSetK) {
  let max = 0;
  let currentPointDistance;
  let farthestPoint;
  for (let currentPoint = 0; currentPoint < subSetK.length; currentPoint++) {
    currentPointDistance = calculateDistanceOfPointToLine(subSetK[currentPoint], line);
    if(currentPointDistance > max) {
      max = currentPointDistance;
      farthestPoint = subSetK[currentPoint];
    }
  }
  return farthestPoint;
}

/**
 * @description Función que calcula la distancia de un punto a una recta.
 * @param {Object} pointToCheck Par de coordenadas X e Y
 * @param {Object} line Ecuación de una recta
 * @returns Longitud de la linea perpendicular trazada desde un punto a una recta
 */
function calculateDistanceOfPointToLine(pointToCheck, line) {
  return (Math.abs((pointToCheck.x * line[0] + pointToCheck.y * line[1]) - line[2]));

}

/**
 * @description Función que calcula la ecuación de la recta formada por dos
 * puntos dados
 * @param {Object} pointA Par de coordenadas X e Y
 * @param {Object} pointB Par de coordenadas X e Y
 * @returns Un array con los parámetros que representan la ecuación de la recta
 */
function calculateLineEquation(pointA, pointB) {
  let xValue = (pointB.y - pointA.y);
  let yValue = (pointA.x - pointB.x);
  let thirdValue = xValue * pointA.x + yValue * pointA.y;
  return ([xValue, yValue, thirdValue]);
}

/**
 * 
 * @param {*} subSet1 
 * @param {*} subSet2 
 * @param {*} pointsContainer 
 * @param {*} pointA 
 * @param {*} pointB 
 */
function createSubSets(subSet1, subSet2, pointsContainer, pointA, pointB) {
  for (let currentPoint = 0; currentPoint < pointsContainer.length; currentPoint++) {
    if ((!isEqualTo(pointsContainer[currentPoint], pointA)) && (!isEqualTo(pointsContainer[currentPoint], pointB))) {
      if (isPointOnRightOfLine(pointsContainer[currentPoint], pointA, pointB))
        subSet1.push(pointsContainer[currentPoint]);
      else
        subSet2.push(pointsContainer[currentPoint]);
    }
  }
}

/**
 * @description Función que comprueba si dos puntos son iguales.
 * @param {Object} point1 Par de coordenadas X e Y
 * @param {Object} point2 Par de coordenadas X e Y
 * @returns Falso si no son iguales, Verdadero si lo son
 */
function isEqualTo(point1, point2) {
  if (point1.x === point2.x && point2.y === point1.y)
    return true;
  return false;
}


/**
 * @description Función que comprueba si un punto se encuentra a la derecha
 * de la recta formada por dos puntos dados.
 * @param {*} pointToCheck Par de coordenadas X e Y (punto que se comprueba)
 * @param {*} point1 Par de coordenadas X e Y
 * @param {*} point2 Par de coordenadas X e Y
 * @returns True si está a la derecha, False en otro caso.
 */
function isPointOnRightOfLine(pointToCheck, point1, point2) {
  let indicator = (point2.y - point1.y) * pointToCheck.x +
    (point1.x - point2.x) * pointToCheck.y +
    (point2.x * point1.y - point2.y * point1.x);

  if (indicator < 0) {
    return true;
  }
  return false;
}

/**
 * @description Función que se encarga de trazar en el canvas una linea formada
 * por dos puntos dados.
 * @param {Objeto} pointA Par de coordenadas X e Y
 * @param {Objeto} pointB Par de coordenadas X e Y
 * @param {Objeto} CTX Contexto del canvas
 */
function drawLine(pointA, pointB, CTX) {
  CTX.lineWidth = 2.0;
  CTX.beginPath();
  CTX.moveTo(pointA.x, pointA.y);
  CTX.lineTo(pointB.x, pointB.y);
  CTX.stroke();
}

/**
 * @description Función que se encarga de buscar el punto más a la izquierda del
 * canvas.
 * @param {Array} pointsContainer Contenedor de objetos punto
 * @returns Objeto punto más a la derecha
 */
function findFarthestOnLeft(pointsContainer) {
  let point = {x: 1200, y: 800};
  for (let currentPoint = 0; currentPoint < pointsContainer.length; currentPoint++) {
    if (pointsContainer[currentPoint].x < point.x) {
      point.x = pointsContainer[currentPoint].x;
      point.y = pointsContainer[currentPoint].y;
    }
  }
  return point;
}


/**
 * @description Función que se encarga de buscar el punto más a la derecha del
 * canvas.
 * @param {Array} pointsContainer 
 * @returns Objeto punto más a la derecha
 */
function findFarthestOnRight(pointsContainer) {
  let point = {x: 0, y: 800};
  for (let currentPoint = 0; currentPoint < pointsContainer.length; currentPoint++) {
    if (pointsContainer[currentPoint].x > point.x) {
      point.x = pointsContainer[currentPoint].x;
      point.y = pointsContainer[currentPoint].y;
    }
  }
  return point;
}

/**
 * @description Función que dibuja un punto en el canvas en las coordenadas dadas
 * @param {Object} point Par de coordenadas X e Y
 * @param {Object} CTX Contexto del canvas 
 */
function drawPoint(point, CTX) {
  CTX.strokeRect(point.x, point.y, 4, 4);
}


/**
 * @description Función que se encarga de generar números aleatorios para
 * y dibujarlos en el canvas
 * @param {number} nPoints Número de puntos que se van a generar en el canvas
 * @param {array} pointsContainer Contenedor de objetos punto
 * @param {object} CTX Contexto del canvas
 */
function generateRandomPoints(nPoints, pointsContainer, CTX, CANVAS) {
  for (let currentPointCreator = 0; currentPointCreator < nPoints; currentPointCreator++) {
    let point = {x: 0, y: 0};
    pointsContainer.push(generatePoint(point, CANVAS));
    drawPoint(point, CTX);
  }
}

/**
 * @description Función que modifica por referencia un Objeto punto
 * y lo devuelve
 * @param {Objeto} point Par de coordenadas X e Y
 * @returns Objeto punto.
 */
function generatePoint(point, CANVAS) {
  point.x = generateRandomInt(CANVAS.width);
  point.y = generateRandomInt(CANVAS.height);
  return point;
}

/**
 * @description Función
 * @param {number} value Valor numérico que es o el height
 * o el width del canvas
 * @returns Valor numérico escalado al valor dado.
 */
function generateRandomInt (value) {
  return Math.floor(Math.random() * value);
}

/**
 * @description Función que toma los datos necesarios para llevar a cabo la 
 * ejecución del algoritmo.
 */
function generateCanvas() {
  const CANVAS = document.getElementById("quickhull");
  let nPoints = prompt("Numero de puntos: ", "3");
  let pointsContainer = [];
  if (CANVAS.getContext) {
    const CTX = CANVAS.getContext('2d');
    generateRandomPoints(nPoints, pointsContainer, CTX, CANVAS);
    quickHull(pointsContainer, CTX);
  }
  else
    window.alert("No entra en la condicion");
}

/**
 * @description Función invocante del programa
 */
function draw() {
  generateCanvas();
}

function run() {
  const CANVAS = document.getElementById("quickhull");
  const NPOINTS = parseInt(document.getElementById("puntos").value);
  let pointsContainer = [];
  if (CANVAS.getContext) {
    const CTX = CANVAS.getContext('2d');
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    generateRandomPoints(NPOINTS, pointsContainer, CTX, CANVAS);
    quickHull(pointsContainer, CTX);
  }
  else
    window.alert("No entra en la condicion");
}

/**
 * @description Función que mediante una promesa hace que el programa espere un
 * tiempo dado en milisegundo
 * @argument ms Tiempo en milisegundos de espera
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}