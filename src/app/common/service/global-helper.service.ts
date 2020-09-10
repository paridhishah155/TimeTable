import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfessorService } from './professor.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  timeTable$ = new BehaviorSubject<any>(null);
  professor$ = new BehaviorSubject<any>(null);
  tempTimeTable = [];
  reset: any;

  constructor(private professorService: ProfessorService) {
    // this.fill2DimensionsArray(6, 5);
    this.professorService.get('timeTable/getTimeTable').then((data: any) => {
      this.timeTable$.next(JSON.parse(data.timeTable));
    }).catch(err => { });
    
    this.professorService.get('professor/getProfessor').then((data: any) => {
      this.professor$.next(data.Name);
    }).catch(err => { });
  }

  fill2DimensionsArray(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.tempTimeTable.push([0]);
      for (let j = 0; j < columns; j++) {
        this.tempTimeTable[i][j] = 0;
      }
    }
    return this.tempTimeTable;
  }
  
}
