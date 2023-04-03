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
  currentUser:any= {};
  class_id:any = '';
  description:any = '';
  uploadData = new FormData();
  file:any = '';
  constructor(public api: ApiServiceService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClasses();
    this.getStudyMaterial();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
  }

  submit(){
    Notiflix.Loading.arrows();
  this.uploadData.append('class_id',this.class_id);
  this.uploadData.append('staff_id',this.currentUser.data._id);
  this.uploadData.append('description',this.description);
  this.api.addStudyMaterial(this.uploadData).subscribe((res:any)=>{
    Notiflix.Loading.remove();
    if(res.status){
      this.getStudyMaterial();
     Notiflix.Notify.success(res.message);
     this.modalService.dismissAll();

    }else{
      Notiflix.Notify.failure(res.message);
    }
  },(error)=>{
  console.log('error :', error);
  Notiflix.Loading.remove();
  Notiflix.Notify.failure("Something Went Wrong..");
  })
  }

  openModal(content:any){
    this.file = '';
    this.class_id = '';
    this.description = '';
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

  saveImage(event: any){
  this.uploadData.append('file',event.target.files[0]);
       
  }

  getStudyMaterial(){
    Notiflix.Loading.arrows();
    this.api.getStudyMaterial().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.allMaterial = res.data;
        this.allMaterial.forEach((element:any) => {
          element.created_at = new Date(element.created_at * 1000);
        });
      }
      else{
        Notiflix.Notify.failure(res.message);
      }
    },(error)=>{
      console.log('error :', error);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Something Went Wrong..");
      })
  }

}
