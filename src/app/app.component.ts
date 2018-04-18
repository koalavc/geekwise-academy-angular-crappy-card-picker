import { Component, OnInit } from "@angular/core";
import Deck from "../classes/Deck";
import ICard from "../interfaces/ICard";


@Component({
	selector: "application",
	templateUrl: "./app.html"
})
export class AppComponent implements OnInit {
	// write your component code here; create the properties and methods you need to get the job
	// done as described in "app.html"; start by importing modules you need such as "./../classes/Deck"

	public deck: Deck;
	public hand: any[] = [];
	public lastDrawnCard: ICard;
	public card: ICard;

	public ngOnInit():void {
		this.deck = new Deck();
	}

	public getCard() {
		this.lastDrawnCard = this.deck.drawCard()
		this.hand.push(this.lastDrawnCard);
	}

	public returnCard(card) {
		this.hand = this.hand.filter(elmnt => elmnt !== card);
		this.deck.returnCardToDeck(card);
	}

}
