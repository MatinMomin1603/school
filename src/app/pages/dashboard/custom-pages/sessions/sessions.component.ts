import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  constructor(public modalService: NgbModal,public api: ApiServiceService) { }

  ngOnInit(): void {
  }

  openModal(content:any){
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit(){

  }

  closeModal(){
    this.modalService.dismissAll();
  }
}
