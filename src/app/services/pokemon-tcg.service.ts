// pokemon-tcg.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/';

  constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}v1/cards`);
  }
}
