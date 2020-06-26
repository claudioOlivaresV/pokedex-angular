import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { async } from '@angular/core/testing';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {
  comment = new FormControl('', [Validators.required]);
  pokemonsList: any = [];
  filter: any =  [];
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
    this.services.getGeneration(0, 150).toPromise().then((rsp: any) => {
      // console.log(rsp);
      this.pokemonsList = rsp.results;
      this.filter = this.pokemonsList;
      this.getPokemon();
      console.log(this.pokemonsList);
    }, err => {
    });
  }

  getPokemon() {
    this.pokemonsList.forEach((element, index) => {
      this.getOnePokemon(element.url, index);
    });

  }


  getOnePokemon(url, index) {
    this.services.getPokemon(url).toPromise().then((rsp: any) => {
      this.pokemonsList[index].data = rsp;
      this.filter[index].data = rsp;

      if ( index === 149) {
        this.status = {
          data: true,
          loading: false,
          error: null
        };

      }
    }, err => {
      this.status = {
        data: false,
        loading: false,
        error: true
      };
    });
  }

  getFilter() {
    let  pokemonName = this.comment.value;
    pokemonName = pokemonName.toLowerCase();

    this.filter = this.pokemonsList.filter(pokemon => pokemon.name.includes(pokemonName));
    console.log(this.filter);
  }

}
