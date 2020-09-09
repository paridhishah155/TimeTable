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

  ngOnInit(): void {
  }

  addProfessorName() {
    if(this.professorName.trim() === '') {
      this.validateProfessor = true;
      return;
    }else{
      this.validateProfessor = false;
    }

  }

}
