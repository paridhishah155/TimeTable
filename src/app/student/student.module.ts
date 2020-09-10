import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { ProfessorModule } from '../professor/professor.module';



@NgModule({
  declarations: [StudentTimeTableComponent],
  imports: [
    CommonModule,
    ProfessorModule
  ]
})
export class StudentModule { }
