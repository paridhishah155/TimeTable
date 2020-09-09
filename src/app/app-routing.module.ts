import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTimeTableComponent } from './professor/view-time-table/view-time-table.component';
import { CreateLectureComponent } from './professor/create-lecture/create-lecture.component';


const routes: Routes = [{
  path: 'ViewProfessorTimeTable',
  component: ViewTimeTableComponent,
}, {
  path: 'CreateLecture',
  component: CreateLectureComponent,
}, {
  path: '',
  component: LoginComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
