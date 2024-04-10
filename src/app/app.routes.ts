import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckCreateComponent } from './components/deck-create/deck-create.component';
import { DeckDetailComponent } from './components/deck-detail/deck-detail.component';
import { EditDeckComponent } from './components/edit-deck/edit-deck.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cardsList', component: CardListComponent },
  { path: 'decks/create', component: DeckCreateComponent },
  { path: 'decksList', component: DeckListComponent },
  { path: 'decksList/:id', component: DeckDetailComponent },
  { path: 'editDeck/:id', component: EditDeckComponent }, 
];
