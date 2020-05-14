"use strict";

/**
 * Inclusión de las clases que se encuentran en otros ficheros
 * comprobando si la ejecución se da en un navegador o en el node.
 */
let ClassHandForOutput , ClassDeckForOutput, ClassPainterForOutput;

if (typeof require !== 'undefined') {
  ClassHandForOutput = require('../src/hand.js').Hand;
  ClassDeckForOutput = require('../src/chess-controller.js').Deck;
  ClassPainterForOutput = require('../src/painter.js').Painter;
}
else {
  ClassHandForOutput = Hand;
  ClassDeckForOutput = Deck;
  ClassPainterForOutput = Painter;
}

let CARD_IMAGES = new Array(52);
/* 
const CARD_IMAGES = {
  blackQueen: new Image(),
  blackKing: new Image(),
  blackAlfil: new Image(),
  blackTower: new Image(),
  blackPeon: new Image(),
  blackHorse: new Image(),
  whiteQueen: new Image(),
  whiteKing: new Image(),
  whiteAlfil: new Image(),
  whiteTower: new Image(),
  whitePeon: new Image(),
  whiteHorse: new Image(),
}
 */
class PokerOutput extends ClassPainterForOutput {
  constructor(CANVAS_POKER, CONTEXT_POKER) {
    super(CANVAS_POKER, CONTEXT_POKER);
    this.pokerDeck_ = new ClassDeckForOutput();
    this.hand1 = new ClassHandForOutput("mano1");
    this.hand2 = new ClassHandForOutput("mano2");
    this.loadImages();
  }

  startGame() {
    this.pokerDeck_.shuffle();
    let hands = this.pokerDeck_.dealHands(2, 5);
    console.log(this.pokerDeck_);
    console.log(hands);
    this.putImageOnOutput();
  }

  loadImages() {
    let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"];
    let suit = ["C","D","H", "S"];
    let card_iterator = 0;
    for (let i = 0; i < rank.length; i++) {
      for (let j = 0; j < suit.length; j++) {
        let auxImage = new Image();
        auxImage.src = `../poker-cards/${rank[i]}${suit[j]}.png`;
        CARD_IMAGES[card_iterator++] = [auxImage, `${rank[i]}${suit[j]}`];
      }
    }
    console.log(CARD_IMAGES);
  }

  putImageOnOutput (cardLabel, view = 0) {
    let imageToPrint = this.chooseImage(cardLabel);
    this.ctx_.drawImage(imageToPrint, this.width_ * 0.2, this.height_ * 0.2, this.height_ / 2, this.width_ / 2);
  }

  chooseImage(cardLabel) {
    if (cardLabel === undefined)
      return CARD_IMAGES[0][0];
    for (let i = 0; i < CARD_IMAGES.length; i++) {
      let toCheck = cardLabel.suit + cardLabel.rank[1];
      if (CARD_IMAGES[i][1] === toCheck)
        return CARD_IMAGES[i][0];
    } 
  }
}

if (typeof exports !== 'undefined') {
  exports.PokerOutput = PokerOutput;
}