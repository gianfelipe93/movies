import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }    from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';


import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './movie.service';



@NgModule({
  declarations: [
    routingComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
