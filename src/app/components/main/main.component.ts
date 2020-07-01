import { Component, OnInit, OnChanges } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { async } from '@angular/core/testing';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormControl, Validators } from '@angular/forms';
import { HelperServiceService } from 'src/app/services/helper-service.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit, OnChanges {
  message: any = {};
  comment = new FormControl('', [Validators.required]);
  pokemonsList: any = [];
  filter: any =  [];
  status = {
    data: false,
    loading: false,
    error: false
  };

  constructor(private services: ServiceService, private helper: HelperServiceService) { }

  ngOnInit() {

    this.helper.customMessage.subscribe((msg) => {
      this.message = msg;
      this.getGeneration();

    });
  }
  ngOnChanges() {
  }

  getGeneration() {
    this.pokemonsList = [];
    this.filter =  [];
    this.status = {
         data: false,
         loading: false,
         error: false
    };
    this.services.getGeneration(this.message.offset, this.message.limit).toPromise().then((rsp: any) => {
      this.pokemonsList = rsp.results;
      this.filter = this.pokemonsList;
      this.getPokemon();
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

      if ( index === this.pokemonsList.length - 1 ) {
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

  }

}
