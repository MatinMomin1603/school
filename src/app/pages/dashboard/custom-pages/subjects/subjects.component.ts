import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  name:any;
  currentflow:any = 1;
  currentData:any;
  allSubject:any = [];
  constructor(public modalService: NgbModal,public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getSubject()
  }

  openModal(content:any){
    this.currentflow = 1;
    this.name = '';
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getSubject(){
    Notiflix.Loading.arrows();
    this.api.getSubjects().subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.allSubject = res.data;
      }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  submit(){
    Notiflix.Loading.arrows();
  let data = {
    name: this.name
  }
  this.api.addSubject(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
    if(res.status){
      this.modalService.dismissAll();
      this.getSubject();
      Notiflix.Notify.success('Subject Added Successfully..')
    }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
    }
  })
  }

  edit(content:any,data:any){
      this.currentflow = 2;
      this.currentData = data;
      this.name = data.name;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update(){
    Notiflix.Loading.arrows();
    let data = {
      name: this.name,
      // _id: this.currentData._id
    }
    this.api.updateSubject(data,this.currentData._id).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
       this.modalService.dismissAll();
       Notiflix.Notify.success('Subject Updated Successfully..')
       this.currentData  = {};
       this.getSubject();
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  delete(data:any){
    Notiflix.Confirm.show('Do You Want To Delete This Subject',data.name,'Delete','No',
    ()=>{
      Notiflix.Loading.arrows();
      this.api.deleteSubject(data._id).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status == true){
          this.getSubject();
           Notiflix.Notify.success("Subject Deleted Successfully..");
        }else{
                 Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
        }
      })
    },
    ()=>{
      
      
    }
    );
  }

}
