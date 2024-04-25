import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck-service.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Deck } from '../../models/deck.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf, MatIconModule],
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})

export class DeckListComponent {
  decks: Deck[] = [];
showActions: any;

  constructor(private router: Router, private deckService: DeckService) { 
    this.loadDecks();
  }

  loadDecks(): void {
    this.decks = this.deckService.getDecks();
  }

  editDeck(id: number): void {
    this.router.navigate(['/deckEdit', id]); // Redireciona para a página de edição do deck com o ID do deck
  }

  detailDeck(id: number): void {
    this.router.navigate(['/decksList', id]); // Redireciona para a página de edição do deck com o ID do deck
  }

  removeDeck(deckId: number): void {
    this.deckService.removeDeck(deckId);
    this.loadDecks(); // Recarrega a lista de decks após remover o deck
  }
}