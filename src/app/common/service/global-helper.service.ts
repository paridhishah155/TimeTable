import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  timeTable$ = new BehaviorSubject<any>(null);
  professor$ = new BehaviorSubject<any>(null);
  tempTimeTable = [];

  constructor() {
    this.fill2DimensionsArray(6, 5);
  }

  fill2DimensionsArray(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.tempTimeTable.push([0]);
      for (let j = 0; j < columns; j++) {
        this.tempTimeTable[i][j] = 0;
      }
    }
    this.timeTable$.next(this.tempTimeTable);
  }
}
