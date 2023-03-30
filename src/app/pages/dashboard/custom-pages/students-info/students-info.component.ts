import { Component, OnInit } from '@angular/core';

import Notiflix from 'notiflix';
import { ApiServiceService } from '../../../../common/services/api-service.service';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.scss']
})
export class StudentsInfoComponent implements OnInit {
  // 1 = list of student;
  // 2 = add student;
  currentFlow: any = 1;
  allStudents: any = [];
  address:any;
  currentUser:any= {};
  _id:any;
  allClasses:any = [];
  parent_number:any;
  date_of_admission:any;
  class_id:any;
  academic_year:any;
  gender:any;
  last_name:any;
  first_name:any;
  middle_name:any;
  dob:any;
  text:any = "Submit Student";
  registartion_number:any;
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getStudents();
    this.getClasses();
    this.currentUser = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  submit(){
    Notiflix.Loading.arrows();
    // this.currentFlow = 1;
    let data = {
      "first_name": this.first_name,
      "middle_name":this.middle_name,
      "last_name":this.last_name,
      "dob":this.dob,
      "class": this.class_id,
      "parent_number": this.parent_number,
      "address": this.address,
      "gender":  this.gender,
      "date_of_admission": this.date_of_admission,
      "class_id": this.class_id,
      "academic_year": this.academic_year
    }

    this.api.addStudent(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.getStudents();
        Notiflix.Notify.success("Student Added Successfully..");
        this.first_name = '';
        this.middle_name = '',
        this.last_name = '',
        this.dob = ''
         this.class_id = ''
        this.parent_number = ''
         this.address = ''
         this.gender = ''
         this.date_of_admission = '';
         this.class_id = '';
         this.academic_year = '';
         this.currentFlow = 1;
      }
      else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })

  }

  getStudents(){
    Notiflix.Loading.arrows();
    this.api.getStudents().subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.allStudents = res.data;
        console.log('this.allStudents :', this.allStudents);
      }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
}

changeflow(item:any){
  this.currentFlow = item;
  this.text = "Add New Student";
}

    edit(data:any){
      this.first_name = data.first_name;
      this.middle_name = data.middle_name;
      this.last_name = data.last_name;
      this.dob = data.dob;
      this.class_id = data.class_id;
      this.parent_number = data.parent_number;
      this.address = data.address;
      this.gender = data.gender;
      this.date_of_admission = data.date_of_admission;
      this.class_id = data.class_id;
      this.academic_year = data.academic_year;
      this._id = data._id
      this.currentFlow = 2;
      this.text = "Update Student"
    }

    delete(data:any){
       Notiflix.Confirm.show('Do You Want To Delete This Student',data.name,'Delete','No',
    ()=>{
      Notiflix.Loading.arrows();
      this.api.deleteStudents(data._id).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status == true){
           Notiflix.Notify.success("Student Deleted Successfully..");
           this.getStudents();
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

    update(){
      Notiflix.Loading.arrows();
      let payload = {
        "first_name": this.first_name,
        "middle_name":this.middle_name,
        "last_name":this.last_name,
        "dob":this.dob,
        "class": this.class_id,
        "parent_number": this.parent_number,
        "address": this.address,
        "gender":  this.gender,
        "date_of_admission": this.date_of_admission,
        "class_id": this.class_id,
        "academic_year": this.academic_year,
        // "_id": this._id
      }

      this.api.updateStudent(payload,this._id).subscribe((res:any)=>{
      Notiflix.Loading.remove();
        if(res.status){
            Notiflix.Notify.success("syudent Updated SuccessFully..");
            this.getStudents();
            this.currentFlow = 1;
        }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
        }
      })
  
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
