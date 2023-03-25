import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  name:any;
  currentFlow:any = 1;
  currentData:any;
  allTerms:any = [];
  constructor(public modalService: NgbModal,public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllTerns();
  }

  openModal(content:any){
    this.currentFlow = 1;
    this.currentData = {};
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit(){
    Notiflix.Loading.arrows();
    let data = {
      name: this.name
    }
this.api.addTerm(data).subscribe((res:any)=>{
  Notiflix.Loading.remove();
  if(res.status){
    this.modalService.dismissAll();
    Notiflix.Notify.success('Term Added Succesfully..')
    this.getAllTerns();
  }
  else{
    Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
  }
})
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  getAllTerns(){
Notiflix.Loading.arrows();
this.api.getTerms().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
         this.allTerms = res.data;
      }
      else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  update(data:any){
    Notiflix.Loading.arrows();
    let payload = {
      name: data
    }
this.api.updateTerms(payload,this.currentData._id).subscribe((res:any)=>{
  Notiflix.Loading.remove();
  if(res.status){
    this.modalService.dismissAll();
    Notiflix.Notify.success("Term Updated Succesfully..");
    this.getAllTerns();
  }else{
    Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
  }
})
  }

  edit(content:any,data:any){
    this.currentFlow = 2;
    this.name = data.name;
    this.currentData = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  delete(data:any){
    Notiflix.Confirm.show('Do You Want To Delete This Term',data.name,'Delete','No',
    ()=>{
      Notiflix.Loading.arrows();
      this.api.deleteTerm(data._id).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status == true){
           Notiflix.Notify.success("Term Deleted Successfully..");
           this.getAllTerns();
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
