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
  status = {
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
    }, err => {
      console.log(err);
      this.status = {
        data: false,
        loading: false,
        error: true
      };
    });
  }
  back() {
    this.router.navigate(['']);
  }
}
