import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: any[] = [];
  selectedCard: any;
  selectedType: string = '';
  types: string[] = [];
  filteredCards: any[] = [];

  constructor(private pokemonService: PokemonTcgService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pokemonService.getCards().subscribe(
      (data) => {
        this.cards = data.cards;
        this.filteredCards = this.cards;
        this.types = this.getUniqueTypes();
      },
      (error) => {
        console.error('Erro ao buscar cartas de Pokémon:', error);
      }
    );
  }

  // Função para obter todos os tipos de cartas únicos
  getUniqueTypes(): string[] {
    return Array.from(new Set(this.cards.map(card => card.supertype)));
  }

  // Função para filtrar cartas pelo tipo selecionado
  filterByType(): void {
    if (this.selectedType === '') {
      this.filteredCards = this.cards; // Se nenhum tipo selecionado, exibe todas as cartas
    } else {
      this.filteredCards = this.cards.filter(card => card.supertype === this.selectedType);
      console.log(this.filteredCards);
      
    }
    // Força o Angular a verificar e atualizar a exibição
    this.cdr.detectChanges()
  }

  // Função para exibir detalhes do card selecionado
  showDetails(card: any): void {
    this.selectedCard = card;
  }

  // Função para fechar o modal
  closeModal(): void {
    this.selectedCard = null;
  }
}
