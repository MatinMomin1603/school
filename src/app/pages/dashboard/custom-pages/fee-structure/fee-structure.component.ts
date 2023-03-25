import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit {
  name:any;
  currentflow:any = 1;
  class_id:any = '';
  fee:any = '';
  roll_no:any = '';
  remain_fee:any = '';
  allFees:any = [];
  allClasses:any = [];
  allStudent:any = [];
  currentData:any = {};
  feeCompleted:Boolean = true;
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllFees();
    this.getClasses();
  }

  getAllFees(){
    // Notiflix.Loading.arrows();
    this.api.getFeeStructure().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.allFees = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }
  submit(){
    Notiflix.Loading.arrows();
     let data = {
      class_id: this.class_id,
      amount: this.fee * 1,
      student_id: this.roll_no
     }
     this.api.addFeeStructure(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
         this.modalService.dismissAll();
        Notiflix.Notify.success("Fee Added Successfully..");
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
     })
  }

  update(){
    Notiflix.Loading.arrows();
    let data = {
     _id : this.currentData._id,
     amount: this.fee,
     class_id: this.class_id
    }
    this.api.updateFeeStructure(data).subscribe((res:any)=>{
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
    this.fee = '';
    this.class_id = '';
    this.currentflow = 1;
    this.roll_no = '';
    this.feeCompleted = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  edit(content:any,data:any){
    this.currentData= data;
    this.class_id = data.class_id;
    this.fee = data.amount;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  delete(data:any){

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

  getStudent(id:any){
    Notiflix.Loading.arrows();
    this.api.getStudentByclass(id).subscribe((res:any)=>{
          Notiflix.Loading.remove();
          if(res.status){
             this.allStudent = res.data;
             console.log('this.allStudent :', this.allStudent);
          }
          else{
            Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
          }
        })
      }

      getStudentFees(){
    Notiflix.Loading.arrows();
        this.api.getStudentFees(this.class_id,this.roll_no).subscribe((res:any)=>{
          Notiflix.Loading.remove();
          if(res.status){
            this.remain_fee = res.data;
            this.feeCompleted = true;
          }
          else{
            this.feeCompleted = false;
            Notiflix.Notify.failure(res.message)
          }
        })
      }
}
