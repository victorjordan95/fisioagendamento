import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule ({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports: []
})

export class SharedModule {  }