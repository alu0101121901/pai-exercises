let ClassCardSetForHand;
// Ejecucion con node
if (typeof require !== 'undefined') {
  ClassCardSetForHand = require('./cardset.js').CardSet;
} else { //ejecucion browser
  ClassCardSetForHand = CardSet;
}

/**
 * @class Hand
 * @description Clase que representa una mano de cartas de la baraja francesa.
 * @constructor Recibe una etiqueta para la mano e inicializa un conjunto
 * de cartas vacío.
 */
class Hand extends ClassCardSetForHand {
  constructor(label) {
    super();
    this.label_ = label;
  }
  
  /**
   * @description Devuelve el array de cartas que almacena la Mano
   */
  get cards () {
    this.printDeck();
  }
  
  /**
   * @description Devuelve la etiqueta con la que se ha nombrado a la mano.
   */
  get label () {
    return this.label_;
  }
}

if (typeof exports !== 'undefined') {
  exports.Hand = Hand;
}