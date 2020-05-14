// Incluir painter



class Line extends ClassPainter2 {
  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.startPoint_ = {coordX: 0, coordY: 0};
    this.endPoint_ = {coordX: 0, coordY: 0};
  }

  draw(x1, y1, x2, y2, lineWidthValue = 2, colour = 'black') {
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

/**
 * Exportación de la clase Painter
 */
if (typeof exports !== 'undefined') {
  exports.Line = Line;
}