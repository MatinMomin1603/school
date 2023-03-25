import { Component, OnInit } from '@angular/core';
import Notiflix from 'notiflix';
import { ApiServiceService } from '../../../../common/services/api-service.service';

@Component({
  selector: 'app-member-of-staff',
  templateUrl: './member-of-staff.component.html',
  styleUrls: ['./member-of-staff.component.scss']
})
export class MemberOfStaffComponent implements OnInit {
  currentFlow:any = 1;
  first_name:any = '';
  middle_name:any = '';
  last_name:any = '';
  dob:any = '';
  phone_number:any = '';
  address:any = '';
  gender:any = '';
  _id:any = '';
  doj:any = '';
  allStaff:any = [];
  btn:any = 1;
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllStaff();
  }

  submit(){
    Notiflix.Loading.arrows();
    let payload = {
      "first_name":this.first_name,
      "middle_name":this.middle_name,
      "last_name": this.last_name,
      "dob":this.dob,
      "phone_number": this.phone_number,
      "address": this.address,
      "gender": this.gender,
      "doj": this.doj
    }

    this.api.addStaff(payload).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.getAllStaff();
        this.currentFlow = 1;
        this.first_name = '';
        this.middle_name = '';
        this.last_name = '';
        this.dob = '';
        this.phone_number = '';
        this.address = '';
        this.gender = '';
        this.doj = '';
        Notiflix.Notify.success("Staff Added Successfully");
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  getAllStaff(){
    this.api.getStaff().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
       this.allStaff = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  edit(data:any){
    this.first_name = data.first_name;
    this.middle_name = data.middle_name;
    this.last_name = data.last_name;
    this.dob = data.dob;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.doj = data.doj;
    this.gender = data.gender;
    this._id = data._id
   this.currentFlow = 2;
   this.btn = 2;
  }

  update(){
    let payload = {
      "first_name":this.first_name,
      "middle_name":this.middle_name,
      "last_name": this.last_name,
      "dob":this.dob,
      "phone_number": this.phone_number,
      "address": this.address,
      "gender": this.gender,
      "doj": this.doj
    }
    this.api.updateStaff(payload,this._id).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.getAllStaff();
        this.currentFlow = 1;
        this.first_name = '';
        this.middle_name = '';
        this.last_name = '';
        this.dob = '';
        this.phone_number = '';
        this.address = '';
        this.gender = '';
        this.doj = '';
        Notiflix.Notify.success("Staff Updated Successfully");
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  delete(data:any){
    Notiflix.Confirm.show('Do You Want To Delete This Staff',data.name,'Delete','No',
 ()=>{
   Notiflix.Loading.arrows();
   this.api.deleteStaff(data._id).subscribe((res:any)=>{
     Notiflix.Loading.remove();
     if(res.status == true){
        Notiflix.Notify.success("Staff Deleted Successfully..");
        this.getAllStaff();
        this.currentFlow = 1;
     }else{
              Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
     }
   })
 },
 ()=>{
   
   
 }
 );
 }

 changeFlow(){
  this.currentFlow = 2;
  this.btn = 1;
 }

}
