import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTimeTableComponent } from './professor/view-time-table/view-time-table.component';
import { StudentTimeTableComponent } from './student/student-time-table/student-time-table.component';


const routes: Routes = [{
  path: 'ViewProfessorTimeTable',
  component: ViewTimeTableComponent,
}, {
  path: 'StudentTimeTable',
  component: StudentTimeTableComponent,
}, {
  path: '',
  component: LoginComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
