/** Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 9 PAI - Random Walk
 * @file painter.js
 * @author Rafael Cala
 * Correo: alu0101121901@ull.edu.es
 * @since 20/04/20
 * @version 1.0.0
 * @description Fichero que contiene la clase base Painter, cuya funcionalidad
 * es abstraer a sus clases hijas tanto el canvas como su contexto.
 */


"use strict";

/**
 * @class Clase base que almacena el canvas y su contexto, abstrayendo a sus
 * clases derivadas de estos atributos.
 */
class Painter {
  /**
   * @constructor Constructor de la clase Painter
   * @description Almacena el contexto del canvas y sus dimensiones como 
   * atributos privados.
   * @param {Object} canvas 
   * @param {Object} ctx 
   */
  constructor(canvas, ctx) {
    if (canvas !== undefined) {
      this.height_ = canvas.height;
      this.width_ = canvas.width;
    }
    else {
      this.height_ = 1;
      this.width_ = 1;
    }

    this.ctx_ = ctx;
  }
}


class Line extends ClassPainter {
  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.startPoint_ = {coordX: 0, coordY: 0};
    this.endPoint_ = {coordX: 0, coordY: 0};
  }

  draw(x1, y1, x2, y2, colour = 'black', lineWidthValue = 2) {
    this.ctx_.beginPath();
    this.startPoint_.coordX = x1;
    this.startPoint_.coordY = y1;
    this.endPoint_.coordX = x2;
    this.endPoint_.coordY = y2;
    this.ctx_.moveTo(this.startPoint_.coordX, this.startPoint_.coordY);
    this.ctx_.lineTo(this.endPoint_.coordX, this.endPoint_.coordY);
    this.setColour(colour);
    this.lineWidth(lineWidthValue);
    this.ctx_.stroke();
  }

  setColour(colourName) {
    this.ctx_.strokeStyle = `${colourName}`;
  }

  lineWidth(width) {
    this.ctx_.lineWidth = width;
  }
}

class Rect extends Painter {
  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.startPoint_ = {coordX: 0, coordY: 0};
  }

  draw(x1, y1, e = 40, c = 40, colour = 'black') {
    this.ctx_.beginPath();
    this.startPoint_.coordX = x1;
    this.startPoint_.coordY = y1;
    this.setColour(colour);
    this.ctx_.fillRect(this.startPoint_.coordX, this.startPoint_.coordY, e, c);
    this.ctx_.stroke();
  }

  setColour(colourName) {
    this.ctx_.strokeStyle = `${colourName}`;
  }

}

class Circle extends Painter {
  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.startPoint_ = {coordX: 0, coordY: 0};
  }

  draw(x1, y1, radius, start, end, fill = 0, colour = 'black') {
    this.ctx_.beginPath();
    this.startPoint_.coordX = x1;
    this.startPoint_.coordY = y1;
    this.ctx_.arc(this.startPoint_.coordX, this.startPoint_.coordY, radius, start, end);
    this.ctx_.lineWidth = 20;
    if (fill === 1) {
      this.ctx_.fillStyle = `${colour}`;
      this.ctx_.fill();
    }
      
    this.ctx_.stroke();
  }

  setColour(colourName) {
    this.ctx_.strokeStyle = `${colourName}`;
  }

  drawRadius(px, py, radius, start, end, degrees = 0) {
    this.ctx_.beginPath();
    this.ctx_.arc(px, py, radius, start , end, false);
    this.ctx_.stroke(); 
  }

}

/**
 * @description Función que dibuja una cara en el canvas
 * @param {Object} RECT Objeto rect, para cejas
 * @param {Object} CIRCLE Objeto circle para ojos, contorno y sonrisa
 * @param {Object} CANVAS Canvas
 */
function drawFace(RECT, CIRCLE, CANVAS) {
  // Contorno
  CIRCLE.draw(CANVAS.width / 2, CANVAS.height / 2, CANVAS.width * 0.4, 0, Math.PI*2);
  // Ojos
  CIRCLE.draw(CANVAS.width / 2 - 100, CANVAS.height / 2 - 80, 15, 0, Math.PI*2, 1);
  CIRCLE.draw(CANVAS.width / 2 + 100, CANVAS.height / 2 - 80, 15, 0, Math.PI*2, 1);
  // Cejas
  RECT.draw(CANVAS.width / 2 - 140, CANVAS.height / 2 - 140, 80, 20);
  RECT.draw(CANVAS.width / 2 + 60, CANVAS.height / 2 - 140, 80, 20);
  // Sonrisa
  console.log(Math.PI / 4);
  console.log(Math.PI / 2);
  CIRCLE.drawRadius(CANVAS.width / 2, CANVAS.height / 2 +40, 100, (Math.PI / 2) - (Math.PI / 4), (Math.PI / 2) + (Math.PI / 4));
}

function main () {
  const CANVAS = document.getElementById("parte1");
  if (CANVAS.getContext) {
    const CTX = CANVAS.getContext('2d');
    const RECT = new Rect(CANVAS, CTX);
    const CIRCLE = new Circle(CANVAS, CTX);
    drawFace(RECT, CIRCLE, CANVAS);
  }
}

main();

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Painter = Painter;
}