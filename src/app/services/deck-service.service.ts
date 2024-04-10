import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../models/card.model';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl: string = 'https://api.pokemontcg.io/v1/cards';
  private decksKey: string = 'decks';

  constructor(private http: HttpClient) { }

  getAvailableCards(): Observable<Card[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.cards as Card[])
    );
  }

  createDeck(deck: Deck): void {
    let decks: Deck[] = JSON.parse(localStorage.getItem(this.decksKey) || '[]');
    decks.push(deck);
    localStorage.setItem(this.decksKey, JSON.stringify(decks));
  }

  getNextDeckId(): number {
    let decks: Deck[] = JSON.parse(localStorage.getItem(this.decksKey) || '[]');
    return decks.length > 0 ? Math.max(...decks.map(deck => deck.id)) + 1 : 1;
  }

  getDecks(): Deck[] {
    return JSON.parse(localStorage.getItem(this.decksKey) || '[]');
  }

  removeDeck(deckId: number): void {
    let decks: Deck[] = this.getDecks();
    const index = decks.findIndex(deck => deck.id === deckId);
    if (index !== -1) {
      decks.splice(index, 1);
      localStorage.setItem(this.decksKey, JSON.stringify(decks));
    } else {
      console.error(`Deck with ID ${deckId} not found.`);
    }
  }

  updateDeck(deckId: number, updatedDeck: Deck): void {
    let decks: Deck[] = JSON.parse(localStorage.getItem(this.decksKey) || '[]');
    const index = decks.findIndex(deck => deck.id === deckId);
    if (index !== -1) {
      decks[index] = updatedDeck;
      localStorage.setItem(this.decksKey, JSON.stringify(decks));
    }
  }
  

  // Método para obter um deck específico por seu ID
  getDeck(id: number): Observable<Deck | undefined> {
    let decks: Deck[] = JSON.parse(localStorage.getItem(this.decksKey) || '[]');
    const deck = decks.find(d => d.id === id);
    return new Observable(observer => {
      observer.next(deck);
      observer.complete();
    });
  }
}
