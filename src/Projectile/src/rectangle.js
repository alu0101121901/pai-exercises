// Esta clase se usará para imprimir los píxeles en el canvas
// Hay que incluir el painter, classPainter3

class Rectangle extends ClassPainter3 {
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

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Rectangle = Rectangle;
}
