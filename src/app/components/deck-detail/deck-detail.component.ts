import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck-service.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})

export class DeckDetailComponent implements OnInit {
  deckId: number | undefined;
  deck: any;
  pokemonCount: number = 0;
  trainerCount: number = 0;
  colorCount: number = 0;
  uniqueTypes: Set<string> = new Set<string>();

  constructor(private route: ActivatedRoute, private deckService: DeckService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.deckId = +id;
        this.loadDeck();
      } else {
        console.error('Deck ID not found');
      }
    });
  }

  loadDeck(): void {
    if (this.deckId !== undefined) {
      this.deckService.getDeck(this.deckId).subscribe(deck => {
        this.deck = deck;
        this.calculateStatistics();
      });
    }
  }

  calculateStatistics(): void {
    this.pokemonCount = this.deck.cards.filter((card: any) => card.supertype === 'Pokémon').length;
    this.trainerCount = this.deck.cards.filter((card: any) => card.supertype === 'Trainer').length;

    const colors = this.deck.cards.map((card: any) => card.color);
    this.colorCount = new Set(colors).size;

    this.uniqueTypes.clear(); // Limpa o conjunto antes de recalculá-lo
    this.deck.cards.forEach((card: any) => {
      card.types.forEach((type: string) => {
        this.uniqueTypes.add(type);
      });
    });
  }
}