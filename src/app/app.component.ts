import { Component } from "@angular/core";
import ICard from "./../interfaces/ICard";

@Component({
	selector: "application",
	templateUrl: "./app.html"
})
export class AppComponent {
	// yes, OK, this isn't really doing card logic but this will allow us to practice some TypeScript
	private readonly numberOfCards: number = 52;
	private cardSuits: Array<string> = ["♡", "♤", "♧", "♢"];;
	private cardRanks: Array<string> = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

	// publics
	// we can bind to properties
	public pickedCards: ICard[] = [];

	// and invoke functions
	public cardsRemaining(): number {
		return this.numberOfCards - this.pickedCards.length;
	}

	public getLastPickedCardLabel(): string {
		if (!this.pickedCards.length) return;

		const lastPickedCard = this.pickedCards[0];

		return lastPickedCard.rank + " of " + lastPickedCard.suit;
	}

	public invokeCardPicker():ICard {
		let suit: string;
		let rank: string;
		let pickedCard: ICard;

		suit = this.cardSuits[Math.floor(Math.random() * this.cardSuits.length)];

		rank = this.cardRanks[Math.floor(Math.random() * this.cardRanks.length)];

		pickedCard = {
			suit,
			rank
		};

		this.pickedCards.unshift(pickedCard);

		return pickedCard;
	}
}
