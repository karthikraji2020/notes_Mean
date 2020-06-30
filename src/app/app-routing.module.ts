import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppLayoutComponent } from './app-layout/app-layout.component';
import { NotesCreateComponent } from './components/notes-create/notes-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full',
  },
  { 
    path: 'note', 
    component: AppLayoutComponent 
  },
  {
    path:"create", 
    component: NotesCreateComponent
  } ,
  // wildcardRouting
  { path: '**', component: PageNotFoundComponent }
  // wildcardRouting

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
