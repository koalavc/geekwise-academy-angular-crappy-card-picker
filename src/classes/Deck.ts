import ICard from "./../interfaces/ICard";

export default class Deck {
	private _cards:ICard[];
	private _cardRanks:string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	private _cardSuits:string[] = ["♡", "♤", "♧", "♢"];

	private _buildCards() {
		this._cardRanks.forEach(rank => {
			const newCard = {};

			this._cardSuits.forEach(suit => {
				this._cards.push({
					rank,
					suit
				});
			});
		});

		this._consoleCardCount();
	}

	private _consoleCardCount() {
		console.log((this._cards.length) + " cards counted in deck.");
	}

	constructor() {
		console.log("Deck instantiated.");
		this._cards = [];
		this._buildCards();
	}

	public drawCard() {
		const randomCardIndex = Math.floor(Math.random() * this._cards.length);   // fancy psuedo-random stuff
		const card = this._cards[randomCardIndex];                                // fetch myself a reference to the card I'm drawing
		this._cards.splice(randomCardIndex, 1);                                   // remove it from the array so it won't be fetched again
		this._consoleCardCount();

		return card;
	}

	public returnCardToDeck(card:ICard) {
		this._cards.push(card);
		this._consoleCardCount();
	}
}
