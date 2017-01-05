import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from './data.service';
import { Post } from './post';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DataService, Post],
  exports: [DataService, Post]
})
export class SampleModule { }
