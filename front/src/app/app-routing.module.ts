import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPoolComponent }   from './add-pool/add-pool.component';

const routes: Routes = [
  { path: 'add', component: AddPoolComponent }
]

@NgModule({
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
