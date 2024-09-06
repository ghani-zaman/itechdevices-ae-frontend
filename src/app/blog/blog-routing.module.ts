import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogAllComponent } from './blog-all/blog-all.component';
import { BlogListComponent } from './blog-list/blog-list.component';


const routes: Routes = [
  {
    path: '',
    component: BlogAllComponent,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Blog',
          url: ''
        }
      ]
    }
  },
  {
    path: ':url',
    component: BlogListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
