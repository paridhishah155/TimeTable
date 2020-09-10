import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private httpClient: HttpClient) { }
  insertTimetable(data) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`http://localhost:3000/user/saveTimetable` , data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getimeTable(){
    return new Promise((resolve, reject) => {
      this.httpClient.post(`http://localhost:3000/user/getTimetable`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
