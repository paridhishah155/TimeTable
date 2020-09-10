import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private httpClient: HttpClient) { }

  put(data: any, url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.timetableURL + url, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  post(data: any, url: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.timetableURL + url, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(environment.timetableURL + url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
