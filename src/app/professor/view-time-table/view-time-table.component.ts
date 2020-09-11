import { GlobalHelperService } from './../../common/service/global-helper.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorService } from 'src/app/common/service/professor.service';
import { ToastrModule } from 'ngx-toastr';
import { callbackify } from 'util';

@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.component.html',
  styleUrls: ['./view-time-table.component.css']
})
export class ViewTimeTableComponent implements OnInit {
  professorName = '';
  @Input() role = 'Professor';
  lectureName = '';
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
  proArr = [];
  loading = true;
  classCount = 0;
  constructor(private globalHelper: GlobalHelperService, private modalService: NgbModal, private professorService: ProfessorService) { }
  profobj = {};
  ngOnInit(): void {
    // this.fill2DimensionsArray(this.lecture.length, this.timings.length);
    this.globalHelper.timeTable$.subscribe(data => {
      this.count = 0;
      if (data) {
        this.timeTable = data;
        this.loading = false;
      }
    });
    this.globalHelper.professor$.subscribe(data => {
      if (data) {
        this.proArr = [];
        this.professor = data;
        this.professor.forEach(pro => {
          this.proArr.push({ name: pro, value: [0, 0, 0, 0, 0], totalCount: 0 });
        });
        this.timeTable.forEach((row, p) => {
          row.forEach((value, k) => {
            if (value !== 0) {
              this.count++;
              for (let i = 0; i < this.proArr.length; i++) {
                if (this.proArr[i].name === value.professor) {
                  this.proArr[i].value[k] = this.proArr[i].value[k] + 1;
                  this.proArr[i].totalCount++;
                  break;
                }
              }
            }
          });
        });
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
      const professor = {
        Name: this.professorName
      };
      this.professorService.post(professor, 'professor/insertProfessor').then((data: any) => {
        this.globalHelper.professor$.next(this.professor);
        this.globalHelper.showSuccess('Saved', 'Professor Saved.....');
      }).catch(err => { });
      this.professorName = '';
      this.addProfessor.hide();
    }
  }

  addLecture(row, column) {
    this.selectedLecture = [];
    if (this.professor.length === 0) {
      this.globalHelper.showDanger('Saved', 'Please add professor.....');
    } else if (this.count > 25) {
      this.globalHelper.showDanger('Saved', 'Do not add more than 25.....');
    }
    else {
      this.addLectureModal.show();
    }
    this.selectedLecture[0] = row;
    this.selectedLecture[1] = column;
  }
  saveLecture() {
    this.checkEligibility(() => {
      const lecture = {
        class: this.lectureName,
        professor: this.selectedProfessorName
      };
      this.timeTable[this.selectedLecture[0]][this.selectedLecture[1]] = lecture;
      this.globalHelper.timeTable$.next(this.timeTable);
      this.addLectureModal.hide();
      this.count++;
      this.professorService.put({ timeTable: JSON.stringify(this.timeTable) }, 'timeTable/saveTimeTable').then((data: any) => {
        this.globalHelper.professor$.next(this.professor);
        this.globalHelper.showSuccess('Saved', 'Class saved successfully.....');
      }).catch(err => { });
    });
  }
  checkEligibility(callback) {
    for (let i = 0; i < this.proArr.length; i++) {
      if (this.proArr[i].name === this.selectedProfessorName) {
        if (this.proArr[i].value[this.selectedLecture[1]] >= 4) {
          this.globalHelper.showDanger('Professor', 'Have Added professor more than 4 times in the same Day');
          break;
        } else if (this.proArr[i].totalCount >= 18) {
          this.globalHelper.showDanger('Professor', 'Have Added professor more than 18 times in the same Week');
          break;
        } else {
          callback();
          break;
        }
      }
    }
  }
  ResetTable() {
    const tempTimeTable = Array.from({ length: 6 }, () => (
      Array.from({ length: 5 }, () => 0)
    ));
    this.proArr = [];
    this.professor.forEach(pro => {
      this.proArr.push({ name: pro, value: [0, 0, 0, 0, 0], totalCount: 0 });
    });
    this.globalHelper.timeTable$.next(tempTimeTable);
    this.professorService.put({ timeTable: JSON.stringify(tempTimeTable) }, 'timeTable/saveTimeTable').then((data: any) => {

      this.globalHelper.showSuccess('Reset', 'Table has been reset...');
    }).catch(err => { });
  }

}
