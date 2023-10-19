import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  {path:'',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
