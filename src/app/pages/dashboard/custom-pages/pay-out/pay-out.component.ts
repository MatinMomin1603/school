import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Notiflix from 'notiflix';
import { ApiServiceService } from 'src/app/common/services/api-service.service';

@Component({
  selector: 'app-pay-out',
  templateUrl: './pay-out.component.html',
  styleUrls: ['./pay-out.component.scss']
})
export class PayOutComponent implements OnInit {

  name:any;
  currentflow:any = 1;
  description:any = '';
  remain_fee:any = '';
  amount:any = '';
  date:any = '';
  allPayout:any = [];
  currentData:any = {};
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllPayOut()
  }

  getAllPayOut(){
    Notiflix.Loading.arrows();
    this.api.getPayOut().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.allPayout = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }
  submit(){
    Notiflix.Loading.arrows();
     let data = {
      date: this.date,
      description: this.description,
      amount: this.amount * 1
     }
     this.api.addPayOut(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
         this.modalService.dismissAll();
         this.getAllPayOut();
        Notiflix.Notify.success("Fee Added Successfully..");
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
     })
  }

  update(){
    Notiflix.Loading.arrows();
    let payload = {
     _id : this.currentData._id,
     amount: this.amount,
     date: this.date,
     description: this.description
    }
    this.api.updateFeeStructure(payload).subscribe((res:any)=>{
      if(res.status){
         this.modalService.dismissAll();
         this.currentData = {};
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  openModal(content:any){
    this.amount = '';
    this.date = '';
    this.description = '';
    this.currentflow = 1;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  edit(content:any,data:any){
    this.currentData= data;
    this.amount = data.amount;
    this.date = data.date;
    this.description = data.description;
    this.currentflow = 2;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  delete(data:any){

  }

}
