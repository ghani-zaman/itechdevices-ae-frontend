import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAllComponent } from './blog-all/blog-all.component';



@NgModule({
  declarations: [
    BlogListComponent,
    BlogAllComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ]
})
export class BlogModule { }
