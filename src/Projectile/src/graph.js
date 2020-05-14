/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
 * @file graph.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 25/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase Graph, cuya funcionalidad es 
 * dibujar una gráfica en el canvas.
 */


"use strict";
/* istanbul ignore next */
/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassPainter;

if (typeof require !== 'undefined') {
  ClassPainter = require('./painter.js').Painter;
}
else {
  ClassPainter = Painter;
}


/**
 * @class Graph
 * @extends Painter
 * @constructor Recibe el canvas y su contexto para poder llevar a cabo el 
 * dibujo de la gráfica.
 */
class Graph extends ClassPainter {
  constructor(CANVAS, CTX) {
    super(CANVAS, CTX);
    if (CANVAS !== undefined)
      this.originPoint_ = { coordX: this.width_ * 0.05, coordY: this.height_ * 0.95};
    else
      this.originPoint_ = { coordX: 0, coordY: 0};
  }
 
/* istanbul ignore next */
  /**
   * @description Método que invoca a otros métodos, llevando a cabo el dibujo 
   * de las líneas de los ejes, la translación al punto de origen y el dibujo
   * de las líneas perpendiculares a las líneas de los ejes.
   */
  draw() {
    this.drawAxes();
    // Trasladamos el punto de origen del canvas al punto de origen de nuestra leyenda
    this.translateAxes();
    this.drawGrid();
  }

/* istanbul ignore next */
  /**
   * @description Método que dibuja en el canvas las líneas de los ejes 
   * de la gráfica tomando como referencia el punto de origen pasado en el
   * constructor
   */
  drawAxes() {
    // Trazamos linea horizontal
    this.ctx_.beginPath();
    this.ctx_.moveTo(0, this.originPoint_.coordY);
    this.ctx_.lineTo(this.width_, this.originPoint_.coordY);
    this.ctx_.stroke();
    // Trazamos linea vertical
    this.ctx_.beginPath();
    this.ctx_.moveTo(this.originPoint_.coordX, 0);
    this.ctx_.lineTo(this.originPoint_.coordX, this.height_);
    this.ctx_.stroke();
  }

     /* istanbul ignore next */
  /**
   * @description Método que dibuja en las líneas de los ejes líneas
   * perpendiculares a éstas a modo de identificador de distancias
   * en el canvas.
   */
  drawGrid() { 
    let largeLine = 15;
    let shortLine = 5;
    let currentLineLength = shortLine;
    let LargeLineDistance = this.width_ / 7;
    let shortLineDistance = LargeLineDistance / 10;
    let shortCounter = 0;
    for (let currentLine = 0; currentLine <= this.width_; currentLine = currentLine + shortLineDistance) {
      if (shortCounter === 10) {
        currentLineLength = largeLine;
        shortCounter = 0; 
      }
      else
        currentLineLength = shortLine;
      
      this.ctx_.beginPath();
      this.ctx_.moveTo(0, -currentLine);
      this.ctx_.lineTo(-currentLineLength, -currentLine);
      this.ctx_.stroke();

      this.ctx_.beginPath();
      this.ctx_.moveTo(currentLine, 0);
      this.ctx_.lineTo(currentLine, currentLineLength);
      this.ctx_.stroke();
      shortCounter++;
    }
  }
  /**
   * @description Método que sitúa el punto de origen del canvas en el punto 
   * donde se cortan los ejes x e y facilitando el posicionamiento del 
   * proyectil en el canvas.
   */
   /* istanbul ignore next */
  translateAxes() {
    this.ctx_.translate(this.originPoint_.coordX, this.originPoint_.coordY);
  }
}

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Graph = Graph;
}