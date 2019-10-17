//__________________________________________________________________________//
class GameSession {
    constructor(argID, argSettings) {
        this.GameSessionId = argID;
        this.Settings = {
            Theme: argSettings.Theme,
            CardCount: argSettings.CardCount,
            Difficulty: argSettings.Difficulty
        }
        this.Score = 1000;
        this.IsGameCompleted = false;
    }

    SetPlayerName(argPlayerName) {
        this.PlayerName = argPlayerName;
    }

    StartTimer() {
        console.log('[Start Timer]');
    }

    EndTimer() {
        console.log('[End Timer]');
    }

    ClearScore() {
        console.log('[Clear Score]');
    }

    IncrementScore() {
        console.log('[Increment Score: Will I ever use this?]');
    }

    DecrementScore() {
        let DecrementAmount;

        if (this.Settings.Difficulty = 'impossible') {
            DecrementAmount = 100;
        } else if (this.Settings.Difficulty == 'hard') {
            DecrementAmount = 50;
        } else {
            DecrementAmount = 10;
        }

        this.Score -= DecrementAmount;
    }

    CompleteGame() {
        this.IsGameCompleted = true;
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
        this.Cards = [];
    }

    //Handling Matching Functionality
    ClearMatches() {
        this.Matches = [];
        console.log('[Clear Matches: Will I ever use this?]');
    }

    AddToMatches(argMatchId) {
        this.Matches.push(argMatchId);
        console.log('[Match Added]');
    }

    ClearCurrentSelection() {
        this.CurrentSelection = [];
        console.log('[Clear Matches: Will I ever use this?]');
    }

    AddToCurrentSelection(argMatchId) {
        this.CurrentSelection.push(argMatchId);
        if (this.CurrentSelection.length < 1) {
            if (this.CurrentSelection[0] == this.CurrentSelection[1]) {
                this.AddToMatches(argMatchId);
            } else {
                this.ClearMatches();
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
        this.Cards.map(function (cardCur) { console.log('[Flip Up Card'); });
    }

    AllCardsDown() {
        this.Cards.map(function (cardCur) { console.log('[Flip Up Down'); });
    }
}