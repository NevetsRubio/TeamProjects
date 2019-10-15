"use strict"

class Deck {
    constructor(argOptions) {
        //argOptions Should include count, background color, background image, and or content
        this.cards = this.generateDeck(argOptions.count);
    }

    generateDeck(argCardCount) {
        var deck = [];
        var count = (argCardCount / 2).toFixed(0);

        for (var i = 1; i <= count; i++) {
            deck.push(new Card(i, i, i));
            deck.push(new Card(i * 100, i, i));
        }

        this.shuffle(deck);
        return deck;
    }

    shuffle(argDeck) {
        var deck = (argDeck) ? argDeck : this.cards;
        var j, x, i;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];
            deck[i] = deck[j];
            deck[j] = x;
        }
        return deck;
    }

    displayDeck() {
        //Add Cards to Div
        var numOfRows = Math.sqrt(this.cards.length);

        var R1 = document.getElementById('row_1');
        var R2 = document.getElementById('row_2');
        var R3 = document.getElementById('row_3');
        var R4 = document.getElementById('row_4');

        this.cards.map(function (card, i) {
            let div = document.createElement('div');

            div.id = card.CardId;
            div.innerHTML = card.CardContent;
            div.classList = 'card'

            if (i < numOfRows) {
                R1.appendChild(div);
            } else if (i < numOfRows * 2) {
                R2.appendChild(div);
            } else if (i < numOfRows * 3) {
                R3.appendChild(div);
            } else if (i < numOfRows * 4) {
                R4.appendChild(div);
            } else if (i < numOfRows * 5) {
                R2.appendChild(div);
            } else if (i < numOfRows * 6) {
                R3.appendChild(div);
            } else if (i < numOfRows * 7) {
                R4.appendChild(div);
            } else if (i < numOfRows * 8) {
                R4.appendChild(div);
            }
        });
    }

    clearBoard() {
        var R1 = document.getElementById('row_1');
        var R2 = document.getElementById('row_2');
        var R3 = document.getElementById('row_3');
        var R4 = document.getElementById('row_4');
        var R5 = document.getElementById('row_5');
        var R6 = document.getElementById('row_6');
        var R7 = document.getElementById('row_7');
        var R8 = document.getElementById('row_8');

        while (R1.firstChild) {
            R1.removeChild(R1.firstChild);
        }

        while (R2.firstChild) {
            R2.removeChild(R2.firstChild);
        }

        while (R3.firstChild) {
            R3.removeChild(R3.firstChild);
        }

        while (R4.firstChild) {
            R4.removeChild(R4.firstChild);
        }

        while (R5.firstChild) {
            R5.removeChild(R5.firstChild);
        }

        while (R6.firstChild) {
            R6.removeChild(R6.firstChild);
        }

        while (R7.firstChild) {
            R7.removeChild(R7.firstChild);
        }

        while (R8.firstChild) {
            R8.removeChild(R8.firstChild);
        }
    }
}

class Card {
    constructor(argCardId, argCardPairId, argOptions) {
        this.CardId = argCardId;
        this.CardPairId = argCardPairId;
        this.CardContent = argOptions;

        // var options = argOptions || {}
        // this.CardBG_Image = options.Image || null;
        // this.CardBG_Color = options.Color || null;
        // this.CardContent = options.Content || null;
        // if (options.Image == null && options.Color == null && options.Content == null) {
        //     this.CardContent = 'ERROR';
        //     console.error('An option must be set for card ID: ' + (argCardId) ? argCardId : 'Card ID Not Provided.');
        // }
    }

    getCardValue() {
        return this.cardValue;
    }

    flipCardUp() {

    }

    flipCardDown() {

    }
}

var options = {
    count: 16
}

var deck = new Deck(options);
deck.displayDeck();

function btnShuffleReload_Click() {
    deck.clearBoard();
    deck.shuffle();
    deck.displayDeck();
}