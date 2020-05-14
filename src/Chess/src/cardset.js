class CardSet {
  constructor() {
    this.deck_ = [];
  }

    /**
   * @description Método que extrae la carta que se encuentre en el último
   * índice del mazo y la devuelve.
   * @returns Objeto Carta.
   */
  popCard() {
    return this.deck_.pop();
  }
  
  /**
   * @description Método que añade al mazo una carta pasada por parámetro.
   * @param {Objecto} new_card Carta
   */
  addCard(new_card) {
    this.deck_.push(new_card);
  }

  /**
   * @description Método que imprime el estado actual del mazo.
   */
  printDeck() {
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard++)
      console.log(this.deck_[currentCard].toString());
  }

    /**
   * @description Método que invoca al sort estándar del array, pasándole
   * el criterio de comparación de la clase Carta para ordenar correctamente
   * el mazo.
   * @returns 1, si a es mayor que b
   *         -1, si es menor
   *          0, si son iguales.
   */
  sort() {
    this.deck_.sort(function(a, b) {
      if(!a.isLowerThan(b))
        return 1;
      if (a.isLowerThan(b))
        return -1;
      return 0;
    })
  }

  sortByRank() {
    this.deck_.sort(function(a, b) {
      if(!a.isLowerRankThan(b))
        return 1;
      else if (a.isLowerRankThan(b)) {
        return -1;
      }
      else if (!a.isLowerSuitThan(b)) {
        return 1;
      }
      else
        return 0;
    })
  }

  /**
   * @description Método al que se le pasa una mano o un mazo y un número n de
   * cartas, de modo que se mueven n cartas de un mazo/mano a otro mazo/mano
   * usando los métodos de extracción y adición de cartas.
   * @param {Object} deckOrHand Mazo o mano
   * @param {Number} cardsNumber Número de cartas a mover
   */
  moveCards(deckOrHand, cardsNumber) {
    for (let currentCard = 0; currentCard < cardsNumber; currentCard++) {
      let cardToMove = this.popCard();
      deckOrHand.addCard(cardToMove);
    }
  }
}

if (typeof exports !== 'undefined') {
  exports.CardSet = CardSet;
}