import { Component, OnInit, AfterViewInit } from '@angular/core';
import M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-pokemon',
  templateUrl: './details-pokemon.component.html',
  styleUrls: ['./details-pokemon.component.css']
})
export class DetailsPokemonComponent implements OnInit  {
  id;
  evolutionsLine: any = [];
  pokemonsList: any = [];
  status = {
    data: null,
    loading: false,
    error: false
  };

  statusEvolution = {
    data: null,
    loading: false,
    error: false
  };
  url: string;



  constructor(private services: ServiceService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.url = `https://pokeapi.co/api/v2/pokemon/${this.id}/`;
    console.log(this.id);
    this.getOnePokemon(this.url);
  }
  


  getOnePokemon(url) {
    this.services.getPokemon(url).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.status = {
          data: rsp,
          loading: false,
          error: null
        };
      this.getPokemonSpecies(rsp.species.url);
    }, err => {
      console.log(err);
      this.status = {
        data: false,
        loading: false,
        error: true
      };
    });
  }

  getOnePokemon2(url) {
    this.services.getPokemon(url).toPromise().then((rsp: any) => {
      this.pokemonsList.push(rsp);

      this.pokemonsList.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    }, err => {
      console.log(err);
    });
  }


  getPokemonSpecies(url) {
    this.services.getPokemonSpecies(url).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.getEvolutions(rsp.evolution_chain.url);
    }, err => {
      console.log(err);
    });
  }
  getEvolutions(url) {
    this.services.getEvolution(url).toPromise().then((rsp: any) => {
      console.log(rsp);
      this.statusEvolution = {
        data: rsp.chain,
        loading: false,
        error: false
      };
      this.evolutionsLine.push(rsp.chain.species.name)
      if (rsp.chain.evolves_to.length){
        rsp.chain.evolves_to.forEach(element => {
          this.evolutionsLine.push(element.species.name);
        });
        if (rsp.chain.evolves_to[0].evolves_to.length) {
          this.evolutionsLine.push(rsp.chain.evolves_to[0].evolves_to[0].species.name)
        }
      }
      console.log(this.evolutionsLine);
      if (this.evolutionsLine.length === 1 ) {
        console.log('no tiene evolucion');
      } else { 
        this.evolutionsLine.forEach(element => {
          const url2 = `https://pokeapi.co/api/v2/pokemon/${element}/`;
          this.getOnePokemon2(url2);
        });
      }
    }, err => {
      console.log(err);
    });
  }
  back() {
    this.router.navigate(['']);
  }
}
