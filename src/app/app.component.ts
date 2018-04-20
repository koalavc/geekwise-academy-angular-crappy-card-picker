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
	public lifebarHeight: string = '100px';
	public lifebarHealth: string = 'hsl(100, 100%, 50%)';
	public winnerWinnerChickenDinner: boolean = false;
	public btnMsg: string = 'Pick a Card!';

	public ngOnInit():void {
		this.deck = new Deck();
	}

	// Button will pull a card if you have less than 52 cards in hand,
	// or it will reset the deck if you have drawn all cards
	public btnClick() {
		this.hand.length === 51 ? this.btnMsg = 'Reset Deck' : this.btnMsg = 'Pick a Card!';
		this.hand.length < 52 ? this.getCard() : this.resetDeck();
	}

	// Draws a card from the deck, updates lifebar and checks blackjack
	public getCard() {
		this.lastDrawnCard = this.deck.drawCard();
		this.hand.push(this.lastDrawnCard);
		this.lifebar();
		this.blackjack();
	}

	// Remove card from hand and return it to deck, update lifebar anc check blackjack
	public returnCard(card) {
		this.hand = this.hand.filter(elmnt => elmnt !== card);
		this.deck.returnCardToDeck(card);
		this.lifebar();
		this.blackjack();
		this.hand.length === 52 ? this.btnMsg = 'Reset Deck' : this.btnMsg = 'Pick a Card!';
	}

	public lifebar() {
		// Calc the num of available cards out of 52 and move decimal over 2 places
		const calc = ((52 - this.hand.length) / 52) * 100;
		// Change Height of Bar
		this.lifebarHeight = `${calc}px`;
		// Change Color of Bar
		this.lifebarHealth = `hsl(${calc}, 100%, 50%)`;
	}

	public resetDeck() {
		// Return all cards from hand to deck
		this.hand.map(card => this.deck.returnCardToDeck(card));
		this.hand = [];
		// Reset Defaults
		this.lifebarHeight = '100px';
		this.lifebarHealth = 'hsl(100, 100%, 50%)';
		this.lastDrawnCard = { rank: '', suit: '' };
	}

	// Iterate through hand and check if card values === 21, dispaly blackjack if they do
	public blackjack() {
		let handCounter = 0;
		for( let card of this.hand ) {
			switch (card.rank) {
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				case '10':
					handCounter += +(card.rank);
					break;
				case 'J':
				case 'Q':
				case 'K':
					handCounter += 10;
					break;
				case 'A':
					handCounter + 11 > 21 ? handCounter += 1 : handCounter += 11;
					break;
			}
		}
		handCounter === 21 ? this.winnerWinnerChickenDinner = true : this.winnerWinnerChickenDinner = false;
	}

}
