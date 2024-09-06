import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectPermanentComponent } from './redirect-permanent/redirect-permanent.component';

const routes: Routes = [
  {
    path: 'not-found.html',
    component: NotFoundComponent
  },
  {
    path: 'redirect.html',
    component: RedirectPermanentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
