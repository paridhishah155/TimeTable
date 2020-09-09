import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { ViewTimeTableComponent } from './view-time-table/view-time-table.component';



@NgModule({
  declarations: [CreateLectureComponent, ViewTimeTableComponent],
  imports: [
    CommonModule
  ]
})
export class ProfessorModule { }
