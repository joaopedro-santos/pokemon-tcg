// deck-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck-service.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Location } from '@angular/common';

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
      });
    }
  }
}