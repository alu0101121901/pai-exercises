

let ClassPokerOutput;
// Ejecucion con node
if (typeof require !== 'undefined') {
  ClassPokerOutput = require('./pokerOutput.js').PokerOutput;
} else { //ejecucion browser
  ClassPokerOutput = PokerOutput;
}

const CANVAS_POKER = document.getElementById("pokerGame");
const CONTEXT_POKER = CANVAS_POKER.getContext("2d");
const POKER_OUTPUT = new ClassPokerOutput(CANVAS_POKER, CONTEXT_POKER);

function giveHands() {
  POKER_OUTPUT.startGame();
}
