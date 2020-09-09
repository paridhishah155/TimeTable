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
  validateProfessor = false;
  @ViewChild('addProfessor') public addProfessor: ModalDirective;
  constructor(private modalService: NgbModal) { }

  lecture = ['09:00am', '10:00am', '11:00am', '12:00am', '01:00pm', '02:00pm'];
  /* days  = ['MONDAY',	'TUESDAY',	'WEDNESDAY',	'THURSDAY',	'FRIDAY'] */
  timings = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '1:00-2:00']
  ngOnInit(): void {
  }

  addProfessorName() {
    if (this.professorName.trim() === '') {
      this.validateProfessor = true;
      return;
    } else {
      this.validateProfessor = false;
    }
  }

  addLecture(row, column) {
    alert(row + ' ' + column);
  }

}
