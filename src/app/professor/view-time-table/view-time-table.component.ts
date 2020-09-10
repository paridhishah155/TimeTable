import { ProfessorService } from './../../common/service/professor.service';
import { GlobalHelperService } from './../../common/service/global-helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.component.html',
  styleUrls: ['./view-time-table.component.css']
})
export class ViewTimeTableComponent implements OnInit {
  professorName: string = '';
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

  constructor(private globalHelper: GlobalHelperService, private modalService: NgbModal, private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.fill2DimensionsArray(this.lecture.length, this.timings.length);
  }

  fill2DimensionsArray(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this.timeTable.push([0]);
      for (let j = 0; j < columns; j++) {
        this.timeTable[i][j] = 0;
      }
    }
  }

  addProfessorName() {
    if (this.professorName.trim() === '') {
      this.validateProfessor = true;
      this.professorName = '';
      return;
    } else {
      this.validateProfessor = false;
      this.professor.push(this.professorName);
      this.professorName = '';
      this.addProfessor.hide();
    }
  }

  addLecture(row, column) {
    this.selectedLecture = [];
    if (this.professor.length === 0) {
      alert('Please add professor');
    } else {
      this.addLectureModal.show();
    }
    this.selectedLecture[0] = row;
    this.selectedLecture[1] = column;
  }

  saveLecture() {
    var lecture = {
      class: this.lectureName,
      professor: this.selectedProfessorName
    }
    this.timeTable[this.selectedLecture[0]][this.selectedLecture[1]] = lecture;
    console.log(this.timeTable);
    this.selectedProfessorName = '';
    this.lectureName = '';
    this.professorService.insertTimetable(this.timeTable);
    this.addLectureModal.hide();
  }
}
