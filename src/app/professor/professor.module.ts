import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTimeTableComponent } from './view-time-table/view-time-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({

  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [ViewTimeTableComponent],
  declarations: [ViewTimeTableComponent]
})
export class ProfessorModule { }
