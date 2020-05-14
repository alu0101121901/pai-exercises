"use strict";

let ClassHand;
// Ejecucion con node
if (typeof require !== 'undefined') {
  ClassHand = require('./hand.js').Hand;
} else { //ejecucion browser
  ClassHand = Hand;
}




class PokerHand extends ClassHand {
  constructor(label) {
    super(label);
  }

  hasPair() {
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard) {
      for (let currentCardToMatch = currentCard + 1; currentCardToMatch < this.deck_.length; currentCardToMatch) {
        if (this.deck_[currentCard].isEqualTo(this.deck_[currentCardToMatch]))
          return true;
      }
    }
    return false;
  }

  hasTwoPair() {
    let pairsObtained = [];
    const TWOPAIR = 2;
    let counterOfPair = 0;
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard) {
      for (let currentCardToMatch = currentCard + 1; currentCardToMatch < this.deck_.length; currentCardToMatch) {
        if (this.deck_[currentCard].isEqualTo(this.deck_[currentCardToMatch])) {
          // Comprobamos que ninguno de los dos valores encontrados hayan sido ya visitados. 
          let isOnPair = false;
          for (let currentPair = 0; currentPair < pairsObtained.length; currentPair++) {
            if (this.deck_[currentCard].isEqualTo(pairsObtained[currentPair]) || 
                this.deck_[currentCardToMatch].isEqualTo(pairsObtained[currentPair]))
                isOnPair = true;
          }
          if (!isOnPair) {
            counterOfPair++;
            pairsObtained.push(this.deck_[currentCard]);
            pairsObtained.push(this.deck_[currentCardToMatch]);
          }
          break;
        }
      }
      if(counterOfPair === TWOPAIR) return true;
    }
    return false;
  }

  hasThreeOfAKind() {
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard)
      for (let currentCardToMatch = currentCard + 1; currentCardToMatch < this.deck_.length; currentCardToMatch)
        for (let thirdCurrentCardToMatch = currentCardToMatch + 1; thirdCurrentCardToMatch < this.deck_.length; thirdCurrentCardToMatch++)
          if (this.deck_[currentCard].isEqualTo(this.deck_[currentCardToMatch]) && this.deck_[currentCard].isEqualTo(this.deck_[thirdCurrentCardToMatch]))
            return true;
    return false;
  }

  hasFlush() {
    let counter = 0;
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard) {
      let currentSuit = this.deck_[currentCard].suit;
      counter = 0;
      for (let currentCardToMatch = 0; currentCardToMatch < this.deck_.length; currentCardToMatch) {
        if (currentSuit === this.deck_[currentCardToMatch].suit) counter++;
      }
      if (counter === 5) return true;
    }
    return false;
  }

  hasFourOfAKind() {
    let counter = 0;
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard) {
      let currentRank = this.deck_[currentCard].rankv;
      counter = 0;
      for (let currentCardToMatch = 0; currentCardToMatch < this.deck_.length; currentCardToMatch) {
        if (currentRank === this.deck_[currentCardToMatch].rankv) counter++;
      }
      if (counter === 4) return true;
    }
    return false;
  }

  hasStraight() {
    this.sortByRank();
    let counter = 0;
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard) {
      let currentRank = this.deck_[currentCard].rankv;
      counter = 0;
      for (let currentCardToMatch = currentCard + 1; currentCardToMatch < this.deck_.length; currentCardToMatch) {
        if ((currentRank === this.deck_[currentCardToMatch].rankv - 1) ||
            (currentRank === 1 && counter === 4)) {
          counter++;
          currentRank = this.deck_[currentCardToMatch].rankv;        
        }
        else break; 
      }
      if (counter === 5) return true;
    }
    return false;
  }

  hasStraightFlush() {
    
  }
  
  hasFullHouse() {
    const visitedCards = [];
    for (let i = 0; i < this.deck_.length; i++)
      visitedCards.push(false);
    
    let pairs = 0;
    let threes = 0;
    for (let currentCard = 0; currentCard < this.deck_.length; currentCard++) {
      let firstCard = this.deck_[currentCard];
      for (let secondCurrentCard = currentCard + 1; secondCurrentCard < this.deck_.length; secondCurrentCard++) {
        let secondCard = this.deck_[secondCurrentCard];
        if (!visitedCards[currentCard] && !visitedCards[secondCurrentCard] && (firstCard.rankv === secondCard.rankv)) {
          pairs++;
          visitedCards[currentCard] = true;
          visitedCards[secondCurrentCard] = true;
          for (let thirdCurrentCard = secondCurrentCard + 1; thirdCurrentCard < this.deck_.length; thirdCurrentCard++) {
            let thirdCard = this.deck_[thirdCurrentCard];
            if(!visitedCards[thirdCurrentCard] && (firstCard.rankv === thirdCard.rankv)) {
              threes++;
              pairs--;
              visitedCards[thirdCurrentCard] = true;
              break;
            }
          }
        }
        if ((pairs === 2) && (threes === 3))
          return true;
      }
    }
    return false;
  }

  classify(handToCheck) {
    if (this.hasStraightFlush())
      handToCheck.label_ = "straight flush";
    else if (this.hasFourOfAKind())
      handToCheck.label_ = "four of a kind";
    else if (this.hasFullHouse())
      handToCheck.label_ = "full house";
    else if (this.hasFlush())
      handToCheck.label_ = "flush";
    else if (this.hasStraight())
      handToCheck.label_ = "straight";
    else if (this.hasThreeOfAKind())
      handToCheck.label_ = "three of a kind";
    else if (this.hasTwoPair())
      handToCheck.label_ = "two pairs";
    else if (this.hasPair())
      handToCheck.label_ = "pair";
    else 
      handToCheck.label_ = "single hand";
  }
}

if (typeof exports !== 'undefined') {
  exports.PokerHand = PokerHand;
}
