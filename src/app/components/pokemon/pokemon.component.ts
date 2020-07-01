import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input()
  item: any;
  @Input()
  showButton: any;

  constructor(private router: Router) { }

  ngOnInit() {}

  viewMore(id) {
    this.router.navigate(['pokemon/' + id]);
  }

}
