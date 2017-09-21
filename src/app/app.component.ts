import { Component } from "@angular/core";
import ICard from "./../interfaces/ICard";
import Deck from "./../classes/Deck";

@Component({
	selector: "application",
	templateUrl: "./app.html",
	styleUrls: ['./app.css']
})
export class AppComponent {
	private _deck:Deck;

	constructor() {
		this._deck = new Deck();
		this.myHand = [];
	}

	// publics
	// we can bind to properties
	public myHand:ICard[];

	// and invoke functions
	drawCard() {
		this.myHand.unshift(this._deck.drawCard());
	}

	getDeckCardCount() {
		return this._deck.getCardCount();
	}

	returnCard(card) {
		this._deck.returnCardToDeck(card);
		this.myHand.splice(this.myHand.indexOf(card), 1);
	}

	public getLastPickedCardLabel(): string {
		if (!this.myHand.length) return;

		const lastPickedCard = this.myHand[0];

		return lastPickedCard.rank + " of " + lastPickedCard.suit;
	}
}
