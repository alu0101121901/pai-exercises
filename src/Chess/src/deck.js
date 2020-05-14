/**
 * Variables constantes usadas para crear las cartas y el mazo de la baraja francesa.
 */
/* const CLUBS = "Clubs";
const DIAMONDS = "Diamonds";
const HEARTS = "Hearts";
const SPADES = "Spades"; */

let ClassCard, ClassHandForDeck, ClassCardSet, ClassPokerHand;
// Ejecucion con node
if (typeof require !== 'undefined') {
  ClassCard = require('card.js').Card;
  ClassHandForDeck = require('hand.js').Hand;
  ClassCardSet = require('cardset.js').CardSet;
  ClassPokerHand = require('poker-hand.js').PokerHand;
} else { //ejecucion browser
  ClassCard = Card;
  ClassHandForDeck = Hand;
  ClassCardSet = CardSet;
  ClassPokerHand = PokerHand;
}

/**
 * @Class Deck
 * @description Clase que representa el mazo de una baraja francesa,
 * siendo una conjunto de objetos Carta.
 * @constructor
 */
class Deck extends ClassCardSet {

  constructor() {
    super();
    let aux = [];
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < RANKS.length; j++) {
        let newCard = new ClassCard(SUITS[i], RANKS[j]);
        aux.push(newCard);
      }
    }
    this.deck_ = aux;
  }

  get deck () {
    return this.deck_;
  }

  /**
   * @description Método que desordena el array de cartas de la clase
   * haciendo intercambios de índices generados aleatoriamente.
   */
  shuffle() {
    let temp, firstIndex, secondIndex;
    for (firstIndex = this.deck_.length - 1; firstIndex > 0; firstIndex--) {
      secondIndex = Math.floor(Math.random() * (firstIndex + 1));
      temp = this.deck_[firstIndex];
      this.deck_[firstIndex] = this.deck_[secondIndex];
      this.deck_[secondIndex] = temp;
    }
  }

  dealHands(handsNumber, cardsPerHand) {
    let handsContainer = [];
    if (handsNumber * cardsPerHand > this.deck_.length) console.log("Error");
    else {
      // Inicializamos la lista de manos.
      for (let currentHand = 0; currentHand < handsNumber; currentHand++) {
        let handToPush = new ClassPokerHand(`hand ${currentHand}`);
        handsContainer[currentHand] = handToPush;
      }
      // En cada ronda insertamos una carta por mano.
      for (let currentRound = 0; currentRound < cardsPerHand; currentRound++) {
        for (let currentHand = 0; currentHand < handsNumber; currentHand++) {
          let cardToMove = this.popCard();
          handsContainer[currentHand].addCard(cardToMove);
        }
      }
    }
    return handsContainer;
  }
}

if (typeof exports !== 'undefined') {
  exports.Deck = Deck;
}