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
        let numOfRows = Math.sqrt(cards.length);

        for (let i = 0; i < numOfRows; i++) {
            rows.push(this.CreateFlexBoxRow(i));
        }

        let FlexItem;
        let counter = 0;
        let rowNum = 0;

        for (let i = 0; i < cards.length; i++) {
            if (counter >= numOfRows) {
                rowNum++;
                counter = 0;
            }
            FlexItem = this.CreateFlexItem(cards[i]);
            rows[rowNum].appendChild(FlexItem);
            counter++;
        }

        for (let i = 0; i < rows.length; i++) {
            PH.appendChild(rows[i]);
        }

        document.getElementById('main').style.display = 'block';
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
        card.style.backgroundImage = 'url(' + argCard.CardImage.ImageSrc + ')';
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
        this.images = null;
        this.Cards = this.GenerateDeck(argOptions.CardCount);
    }

    GenerateDeck(argCardCount) {
        let deck = [];
        let count = (argCardCount / 2).toFixed(0);

        this.images = this.GenerateImages(count);

        for (let i = 1; i <= count; i++) {
            deck.push(new Card(i, i, this.images[i]));
            deck.push(new Card(i * 100, i, this.images[i]));
        }

        this.Shuffle(deck);
        return deck;
    }

    GenerateImages(argCardCount) {
        let images = [];
        //let count = (argCardCount / 2).toFixed(0);
        let count = argCardCount;

        for (let i = 1; i <= count; i++) {
            images.push(new Images(this.Theme, this.CardCount, this.Difficulty));
            images.push(new Images(this.Theme, this.CardCount, this.Difficulty));
        }

        this.Shuffle(images);
        return images;
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

//__________________________________________________________________________//
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

//__________________________________________________________________________//
class Images {
    constructor(argTheme, argImageCount, argDifficulty) {
        this.ImageSrc = this.getImageSource(argTheme, argImageCount, argDifficulty);
        this.RelAttribute = this.getRelationship();
    }

    getImageSource(argTheme, argImageCount, argDifficulty) {
        let Source;

        if (argTheme == 'pokemon') {
            Source = this.getPokemon(argDifficulty);
        } else if (argTheme == 'power rangers') {
            Source = this.getPowerRangers(argDifficulty);
        } else if (argTheme == 'game of thrones') {
            Source = this.getGameOfThrones(argDifficulty);
        }

        return Source;
    }

    getRelationship() {
        let Relationship;

        return Relationship;
    }

    getPokemon(argDifficulty) {
        if (argDifficulty == 'easy') {
            return 'images/pokemon/1.jpg';
        } else if (argDifficulty == 'hard') {

        } else if (argDifficulty == 'impossible') {

        }
    }

    getPowerRangers(argDifficulty) {
        if (argDifficulty == 'easy') {

        } else if (argDifficulty == 'hard') {

        } else if (argDifficulty == 'impossible') {

        }
    }

    getGameOfThrones(argDifficulty) {
        if (argDifficulty == 'easy') {

        } else if (argDifficulty == 'hard') {

        } else if (argDifficulty == 'impossible') {

        }
    }
}