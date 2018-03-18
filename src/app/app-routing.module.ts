import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [    
    { path: '', component: HomeComponent },
    { path: 'result', component: ResultComponent },
    { path: 'result/:term', component: ResultComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [AppComponent, ResultComponent, HomeComponent]