//__________________________________________________________________________//
class GameSession {
    constructor(argID, argSettings) {
        this.GameSessionId = argID;
        this.Settings = {
            Theme: argSettings.Theme,
            CardCount: argSettings.CardCount,
            Difficulty: argSettings.Difficulty,
            StartingScore: argSettings.StartingScore
        };
        this.Score = argSettings.StartingScore;
        this.IsGameCompleted = false;
        this.GameDeck = new Deck(argID, argSettings);
    }

    SetPlayerName(argPlayerName) {
        this.PlayerName = argPlayerName;
        return this.PlayerName;
    }

    StartTimer() {
        console.log('[Start Timer]');
    }

    EndTimer() {
        console.log('[End Timer]');
    }

    ClearScore() {
        this.Score = this.Settings.StartingScore;
        return this.Score;
    }

    IncrementScore() {
        let IncrementAmount;

        if (this.Settings.Difficulty == 'impossible') {
            IncrementAmount = 100;
        } else if (this.Settings.Difficulty == 'hard') {
            IncrementAmount = 50;
        } else {
            IncrementAmount = 10;
        }

        this.Score += IncrementAmount;
        return this.Score;
    }

    DecrementScore() {
        let DecrementAmount;

        if (this.Settings.Difficulty == 'impossible') {
            DecrementAmount = 100;
        } else if (this.Settings.Difficulty == 'hard') {
            DecrementAmount = 50;
        } else {
            DecrementAmount = 10;
        }

        this.Score -= DecrementAmount;
        return this.Score;
    }

    CompleteGame() {
        this.IsGameCompleted = true;
    }

    //Game Board Related
    GenerateBoard(argPlaceHolderId) {
        let PH = document.getElementById(argPlaceHolderId);
        let rows = [];
        let cards = this.GameDeck.Cards;
        let numOfRows = Math.sqrt(this.GameDeck.Cards.length);

        for (let i = 0; i < numOfRows; i++) {
            rows.push(this.CreateFlexBoxRow(i));
        }

        let FlexItem;
        let counter = 0;
        let rowNum = 0;
        for (let i = 0; i < cards.length - 1; i++) {
            if (counter >= numOfRows) {
                rowNum++;
                counter = 0;
            }
            FlexItem = this.CreateFlexItem(cards[i]);
            rows[rowNum].appendChild(FlexItem);
        }

        rows.map(function (row) { PH.appendChild(row); });
    }

    CreateFlexBoxRow(argRowNumber) {
        let FB_Row = document.createElement('div');
        FB_Row.id = "FlexRow_" + argRowNumber;
        FB_Row.classList = "FlexRow";
        return FB_Row;
    }

    CreateFlexItem(argCard) {
        let card = document.createElement('div');
        card.id = argCard.CardId;
        card.classList = "FlexCard";
        return card;
    }
}

//__________________________________________________________________________//
class Deck {
    constructor(argID, argOptions) {
        this.DeckId = argID;
        this.Theme = argOptions.Theme;
        this.Difficulty = argOptions.Difficulty;
        this.CardCount = argOptions.CardCount;
        this.Matches = [];
        this.CurrentSelection = [];
        this.Cards = this.GenerateDeck(argOptions.CardCount);
    }

    GenerateDeck(argCardCount) {
        var deck = [];
        var count = (argCardCount / 2).toFixed(0);

        for (var i = 1; i <= count; i++) {
            deck.push(new Card(i, i, 'Test_1'));
            deck.push(new Card(i * 100, i, 'Test_2'));
        }

        this.Shuffle(deck);
        return deck;
    }

    SelectCardById(argCardID) {
        let tempDeck = this.Cards.slice();
        let card = tempDeck.filter(function (card) { return card.CardId == argCardID }).pop();
        return card;
    }

    //Handling Matching Functionality
    ClearMatches() {
        this.Matches = [];
        return this.Matches;
    }

    AddToMatches(argMatchId) {
        this.Matches.push(argMatchId);
        return this.Matches;
    }

    //Handling Selection Functionality
    ClearCurrentSelection() {
        this.CurrentSelection = [];
        return this.CurrentSelection;
    }

    AddToCurrentSelection(argMatchId) {
        this.CurrentSelection.push(argMatchId);
        if (this.CurrentSelection.length < 1) {
            if (this.CurrentSelection[0] == this.CurrentSelection[1]) {
                this.AddToMatches(argMatchId);
            } else {
                this.ClearCurrentSelection();
            }
        }
    }

    Shuffle(argDeck) {
        var deck = (argDeck) ? argDeck : this.Cards;
        var j, x, i;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];
            deck[i] = deck[j];
            deck[j] = x;
        }
        return deck;
    }

    AllCardsUp() {
        this.Cards.map(function (cardCur) { cardCur.FlipUp(); });
    }

    AllCardsDown() {
        this.Cards.map(function (cardCur) { cardCur.FlipDown(); });
    }
}

class Card {
    constructor(argID, argMatchID, argCardImage) {
        this.CardId = argID;
        this.MatchID = argMatchID;
        this.CardImage = argCardImage;
        this.IsFlippedUp = true;
        this.IsMatched = false;
    }

    FlipUp() {
        this.IsFlippedUp = true;
    }

    FlipDown() {
        this.IsFlippedUp = false;
    }

    FlipToggle() {
        this.IsFlippedUp = !this.IsFlippedUp;
    }

    Match() {
        this.IsMatched = true;
    }
}