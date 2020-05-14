/**
 * Variables constantes usadas para crear las cartas y el mazo de la baraja francesa.
 */
const CLUBS = "C";
const DIAMONDS = "D";
const HEARTS = "H";
const SPADES = "S";
const SUITS = [CLUBS, DIAMONDS, HEARTS, SPADES];
const RANKS = [[1, "A"], [2, "2"],[3, "3"],[4, "4"],[5, "5"],[6, "6"],[7, "7"], [8, "8"], [9, "9"], [10, "10"],[11, "J"],[12, "Q"],[13, "K"]];

/**
 * @class Card 
 * @description Clase que almacena la estructura de una carta de una baraja francesa.
 * @constructor Recibe un palo y un valor y los almacena en los atributos privados.
 */
class Card {
  constructor(suit, rank) {
    this.suit_ = suit;
    this.rank_ = rank;
  }

  get suit () {
    this.suit_;
  }

  get rank () {
    this.rank_;
  }

  isEqualTo(toCompare) {
    if (this.rank_[0] === toCompare.rank_[0] && this.suit_ === toCompare.suit_)
      return true;
    return false;
  }
  /**
   * @description Método que compara una carta con otra. Si son de distinto
   * palo, se llama al metodo de comparación de palos, en otro caso al
   * comparador de valores.
   * @param {Object} toCompare Carta con la que se compara
   * @returns True si es menor, False en caso contrario.
   */
  isLowerThan(toCompare) {
    // Si son del mismo palo, se compara el valor
    if (this.suit_ === toCompare.suit_)
        return this.isLowerRankThan(toCompare);
    // En otro caso, se compara el palo.
    return this.isLowerSuitThan(toCompare);
  }

  get rankv () {
    return this.rank_[0];
  }

  /**
   * @description Método que compara los índices del valor de la carta
   * @param {Object} toCompare Carta con la que se compara.
   * @returns True si el índice es menor, False en otro caso.
   */
  isLowerRankThan(toCompare) {
    if (this.rank_[0] < toCompare.rank_[0])
      return true;
    return false;
  }

    /**
   * @description Método que compara los palos de las cartas
   * siguiendo el criterio dicho en el enunciado.
   * @param {Object} toCompare Carta con la que se compara.
   * @returns True si el palo es menor, False en otro caso.
   */
  isLowerSuitThan(toCompare) {
    if (this.suit_ === SPADES || 
            ((this.suit_ === HEARTS) && (toCompare.suit_ === DIAMONDS || toCompare.suit_ === CLUBS))
            || (this.suit_ === DIAMONDS && toCompare.suit_ === CLUBS))
      return  false;
    return true;
  }
  /**
   * @description Método de impresión de la carta.
   * @returns String con la información del palo - valor de la carta.
   */
  toString() {
    return `${this.rank_[1]} of ${this.suit_}`;
  }
}

if (typeof exports !== 'undefined') {
  exports.Card = Card;
}