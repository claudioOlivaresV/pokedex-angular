import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';

const routes: Routes = [
  { path: '', component: MainComponent  },
  { path: 'pokemon/:id', component: DetailsPokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
