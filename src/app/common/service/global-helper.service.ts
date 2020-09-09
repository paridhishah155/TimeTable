import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  timeTable$ = new BehaviorSubject<any>(null);


  constructor() {
  }
}
