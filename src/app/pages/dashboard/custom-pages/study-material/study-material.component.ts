import { Component, OnInit } from '@angular/core';
import Notiflix from 'notiflix';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-study-material',
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.scss']
})
export class StudyMaterialComponent implements OnInit {
  allClasses:any = [];
  allMaterial:any = [];
  class_id:any = '';
  file:any = '';
  constructor(public api: ApiServiceService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClasses()
  }

  submit(){

  }

  openModal(content:any){
    this.file = '';
    this.class_id = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  getClasses(){
    Notiflix.Loading.arrows();
    this.api.getClasses().subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.allClasses = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong..,please try again..")
      }
    })
  }

}
