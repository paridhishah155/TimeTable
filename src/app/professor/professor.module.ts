import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTimeTableComponent } from './view-time-table/view-time-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';



@NgModule({

  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  exports: [ViewTimeTableComponent],
  declarations: [ViewTimeTableComponent]
})
export class ProfessorModule { }
