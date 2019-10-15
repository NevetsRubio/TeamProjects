"use strict"

class Card {
    constructor(argCardValue) {
        this.cardValue = argCardValue
    }

    getCardValue() {
        return this.cardValue;
    }

    flipCardUp() {

    }

    flipCardDown() {

    }
}

//Add Cards to a deck
var deck = [];
for (var i = 0; i < 8; i++) {
    deck.push(new Card(i));
}
for (var i = 0; i < 8; i++) {
    deck.push(new Card(i));
}

shuffle(deck);

//Add Cards to Div
var numOfRows = Math.sqrt(deck.length);
deck.map(function (card, i) {
    if (i < numOfRows) {
        console.log('row_1', card.cardValue)
    } else if (i < numOfRows * 2) {
        console.log('row_2', card.cardValue)
    } else if (i < numOfRows * 3) {
        console.log('row_3', card.cardValue) 
    } else if (i < numOfRows * 4) {
        console.log('row_4', card.cardValue)
    }
});

//shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
