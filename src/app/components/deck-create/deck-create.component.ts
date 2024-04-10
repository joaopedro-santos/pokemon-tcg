import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from '../../services/deck-service.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  selector: 'app-deck-create',
  templateUrl: './deck-create.component.html',
  styleUrls: ['./deck-create.component.css']
})
export class DeckCreateComponent {
  deckName: string = '';
  selectedCard: any = null;
  selectedCards: Card[] = [];
  availableCards: Card[] = [];
  showToast: boolean = false;

  constructor(private router: Router, private deckService: DeckService) { 
    this.loadAvailableCards();
  }

  loadAvailableCards(): void {
    this.deckService.getAvailableCards().subscribe(cards => {
      this.availableCards = cards;    
    });
  }

  addCard(): void {
    if (!this.selectedCard) {
      return;
    }
  
    // Verificar se o baralho já atingiu o limite máximo de 60 cartas
    if (this.selectedCards.length >= 60) {
      console.error('O baralho já possui o número máximo de cartas (60).');
      return;
    }
    
    // Verificar se o baralho já possui 4 cartas com o mesmo nome
    const numCardsWithSameName = this.selectedCards.filter(c => c.name === this.selectedCard.name).length;
    if (numCardsWithSameName >= 4) {
      console.error('O baralho já possui 4 cartas com o mesmo nome.');
      this.showToast = true;
      return;
    }
    
    this.selectedCards.push(this.selectedCard);
  }

  saveDeck(): void {
    const newDeck: Deck = {
      name: this.deckName,
      cards: this.selectedCards,
      id: this.deckService.getNextDeckId() // Gerar um novo ID de deck
    };
  
    this.deckService.createDeck(newDeck); // Sempre cria um novo deck
  
    this.router.navigate(['/decksList']);
  }

  clearForm(): void {
    this.deckName = '';
    this.selectedCards = [];
    this.selectedCard = null;
  }

  isSaveButtonDisabled(): boolean {
    return this.deckName.trim() === '' || this.selectedCards.length < 24;
  }
}
