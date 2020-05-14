

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassGrid2, ClassRandomStep2;

if (typeof require !== 'undefined') {
  ClassRandomStep2 = require('./random-step.js').RandomStep;
  ClassGrid2 = require('./grid.js').Grid;
}
else {
  ClassRandomStep2 = RandomStep;
  ClassGrid2 = Grid;
}

"use strict";


/**
 * @class RandomWalkGenerator
 * @description Clase que se encarga de generar la ruta aleatoria, 
 * inicializando en primer lugar la cuadrícula, de la cual se obtiene la
 * distancia de los pasos y la posición del centro de esta.
 * Posteriormente, comienza el bucle de pasos, que iterará hasta que la 
 * posición actual del camino 
 */
class RandomWalkGenerator {
  constructor(density, canvas, ctx) {
    this.grid_ = new ClassGrid(density, canvas, ctx);
    this.grid_.initialize();
    let middlePoint = [parseInt(canvas.width / 2), parseInt(canvas.height / 2)]; // {coordX: canvas.width / 2, coordY: canvas.height / 2};
    this.walk_ = new ClassRandomStep(this.grid_.length, middlePoint, canvas, ctx);
  }

  /**
   * @description Método que da pasos sobre las líneas del grid hasta que se
   * encuentra con uno de los bordes de éste.
   */
  createRandomPath() {
    let steps = 0;
    while(this.walk_.insideOfGrid()) {
      this.walk_.step();
      steps++;
    }
    console.log("Numero de pasos dados: " + steps);
    
  }
}


/**
 * Exportación de la clase RandomWalkGenerator
 */
if (typeof exports !== 'undefined') {
  exports.RandomWalkGenerator = RandomWalkGenerator;
  exports.createRandomPath = createRandomPath;
}