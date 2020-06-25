import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {
  pokemonsList: any = [];
  status = {
    data: false,
    loading: false,
    error: false
  };

  constructor(private services: ServiceService) { }

  ngOnInit() {

    this.getGeneration();


    // for (let index = 1; index <= 150; index++) {
    //   this.getOnePokemon(index);
    // }

  }

  getGeneration() {
    this.status = {
      data: false,
      loading: true,
      error: null
    };
    this.services.getGeneration(1, 150).toPromise().then((rsp: any) => {
      this.status = {
        data: true,
        loading: false,
        error: null
      };
      // console.log(rsp);
      this.pokemonsList = rsp.results;
      this.getPokemon();
      console.log(this.pokemonsList);
    }, err => {
      this.status = {
        data: false,
        loading: false,
        error: true
      };
    });
  }

  getPokemon() {
    this.pokemonsList.forEach((element, index) => {
      this.getOnePokemon(element.url, index);
    });

  }


  getOnePokemon(url, index) {
    this.status = {
      data: false,
      loading: true,
      error: null
    };
    this.services.getPokemon(url).toPromise().then((rsp: any) => {
      this.status = {
        data: true,
        loading: false,
        error: null
      };
      this.pokemonsList[index].data = rsp;
      console.log(this.pokemonsList);
    }, err => {
      this.status = {
        data: false,
        loading: false,
        error: true
      };
    });
  }

}
