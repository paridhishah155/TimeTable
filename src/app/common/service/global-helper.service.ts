import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfessorService } from './professor.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  timeTable$ = new BehaviorSubject<any>(null);
  professor$ = new BehaviorSubject<any>(null);
  tempTimeTable = [];
  reset: any;

  constructor(private professorService: ProfessorService, private toastr: ToastrService) {
    this.professorService.get('timeTable/getTimeTable').then((data: any) => {
      this.timeTable$.next(JSON.parse(data.timeTable));
    }).catch(err => { });
    this.professorService.get('professor/getProfessor').then((data: any) => {
      this.professor$.next(data.Name);
    }).catch(err => { });
  }
  showSuccess(title, msg) {
    this.toastr.success(title, msg);
  }
  showDanger(title, msg) {
    this.toastr.error(title, msg);
  }
}
