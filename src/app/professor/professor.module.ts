import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { ViewTimeTableComponent } from './view-time-table/view-time-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreateLectureComponent, ViewTimeTableComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
})
export class ProfessorModule { }
