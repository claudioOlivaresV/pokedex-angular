import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public getPokemon(url) {
    return this.http.get(url);
  }

  public getGeneration(from, to) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${to}&offset=${from}`);
  }
}
