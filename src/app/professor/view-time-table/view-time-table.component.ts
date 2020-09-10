import { GlobalHelperService } from './../../common/service/global-helper.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorService } from 'src/app/common/service/professor.service';


@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.component.html',
  styleUrls: ['./view-time-table.component.css']
})
export class ViewTimeTableComponent implements OnInit {
  professorName: string = '';
  @Input() role = 'Professor';
  lectureName: string = '';
  selectedProfessorName: string;
  validateProfessor = false;
  selectedLecture = [];

  @ViewChild('addProfessor') public addProfessor: ModalDirective;
  @ViewChild('addLectureModal') public addLectureModal: ModalDirective;

  lecture = ['09:00am', '10:00am', '11:00am', '12:00am', '01:00pm', '02:00pm'];
  timings = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '1:00-2:00'];

  timeTable = [];
  professor = [];
  count = 0;

  constructor(private globalHelper: GlobalHelperService, private modalService: NgbModal, private professorService: ProfessorService) { }

  ngOnInit(): void {
    // this.fill2DimensionsArray(this.lecture.length, this.timings.length);
    this.globalHelper.timeTable$.subscribe(data => {
      if (data) {
        this.timeTable = data;
        data.forEach(row => {
          row.forEach(value => {
            if (value != 0) {
              this.count++;
            }
          });
        });
      }
    });
    this.globalHelper.professor$.subscribe(data => {
      if (data) {
        this.professor = data;
      }
    });
  }

  addProfessorName() {
    if (this.professorName.trim() === '') {
      this.validateProfessor = true;
      this.professorName = '';
      return;
    } else {
      this.validateProfessor = false;
      this.professor.push(this.professorName);
      let professor = {
        Name: this.professorName
      }
      this.professorService.post(professor, 'professor/insertProfessor').then((data: any) => {
        this.globalHelper.professor$.next(this.professor);
      }).catch(err => { });


      this.professorName = '';

      this.addProfessor.hide();
    }
  }

  addLecture(row, column) {
    this.selectedLecture = [];
    if (this.professor.length === 0) {
      alert('Please add professor');
    }else if(this.count > 25){
      alert('Do not add more than 25');
    }else {
      this.addLectureModal.show();
    }
    this.selectedLecture[0] = row;
    this.selectedLecture[1] = column;
  }
  saveLecture() {
    const lecture = {
      class: this.lectureName,
      professor: this.selectedProfessorName
    };
    this.timeTable[this.selectedLecture[0]][this.selectedLecture[1]] = lecture;
    this.globalHelper.timeTable$.next(this.timeTable);
    this.selectedProfessorName = '';
    this.lectureName = '';
    this.addLectureModal.hide();
    this.count++;
    this.professorService.put({ "timeTable": JSON.stringify(this.timeTable) }, 'timeTable/saveTimeTable').then((data: any) => {
      this.globalHelper.professor$.next(this.professor);
    }).catch(err => { });;
  }

}
