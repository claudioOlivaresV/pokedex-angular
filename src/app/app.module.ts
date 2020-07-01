import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavbarComponent } from './components/my-navbar/my-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { MainComponent } from './components/main/main.component';

import { FooterComponent } from './components/footer/footer.component';

// Skeleton 
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// Angular Material

import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { HelperServiceService } from './services/helper-service.service';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';






@NgModule({
  declarations: [
    AppComponent,
    MyNavbarComponent,
    MainComponent,
    FooterComponent,
    DetailsPokemonComponent,
    PokemonComponent,
    SkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Skeleton
    NgxSkeletonLoaderModule,

    // angular material

    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],

  providers: [HelperServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
