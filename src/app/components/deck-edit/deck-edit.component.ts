import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../../services/deck-service.service';
import { Deck } from '../../models/deck.model';
import { Card } from '../../models/card.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-deck',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css'],
})
export class DeckEditComponent implements OnInit {
  deckId: number | undefined;
  deck: Deck | undefined;
  availableCards: Card[] = [];
  selectedTypes: Set<string> = new Set<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.deckId = id;
        this.loadDeck();
        this.loadAvailableCards();
      } else {
        console.error('Invalid deck ID');
      }
    });
  }

  loadDeck(): void {
    if (this.deckId !== undefined) {
      this.deckService.getDeck(this.deckId).subscribe((deck) => {
        this.deck = deck;
      });
    }
  }

  loadAvailableCards(): void {
    this.deckService.getAvailableCards().subscribe((cards) => {
      this.availableCards = cards;
    });
  }

  addCard(card: Card): void {
    if (!this.deck) {
      return;
    }

    // Verificar se o baralho já atingiu o limite máximo de 60 cartas
    if (this.deck.cards.length >= 60) {
      console.error('O baralho já possui o número máximo de cartas (60).');
      return;
    }

    // Verificar se o baralho já possui 4 cartas com o mesmo nome
    const numCardsWithSameName = this.deck.cards.filter(
      (c) => c.name === card.name
    ).length;
    if (numCardsWithSameName >= 4) {
      console.error('O baralho já possui 4 cartas com o mesmo nome.');
      return;
    }

    // Adicionar a carta ao baralho
    this.deck.cards.push(card);
  }

  removeCard(index: number): void {
    if (!this.deck) {
      return;
    }

    // Remover a carta do baralho
    this.deck.cards.splice(index, 1);
  }

  saveChanges(): void {
    if (this.deck) {
      this.deckService.updateDeck(this.deck.id, this.deck);
      this.router.navigate(['/decksList']);
    }
  }

  // Adicione uma função para encontrar um card pelo nome
  findCardByName(name: string): Card | undefined {
    return this.availableCards.find((card) => card.name === name);
  }

  // Modifique o método onSelectChange para usar a função findCardByName
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedName = selectElement.value;
    const selectedCard = this.findCardByName(selectedName);
    if (selectedCard) {
      this.addCard(selectedCard);
    } else {
      console.error('Card not found:', selectedName);
    }
  }

  // Adicione uma propriedade computada para filtrar as cartas disponíveis com base nos tipos selecionados
  get filteredAvailableCards(): Card[] {
    if (this.selectedTypes.size === 0) {
      return this.availableCards;
    } else {
      return this.availableCards.filter(card => this.selectedTypes.has(card.supertype));
    }
  }

  // Adicione uma função para alternar os tipos de carta filtrados
  toggleTypeFilter(type: string): void {
    if (this.selectedTypes.has(type)) {
      this.selectedTypes.delete(type);
    } else {
      this.selectedTypes.add(type);
    }
  }
}
