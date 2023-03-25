import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  date:any;
  allStudents:any = [];
  currentFlow:any = 1; 
  class_id:any = '';
  allClasses:any = [];
  allStudentAtt:any = [];
  currentUser:any = {};
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    // this.getStudents();
    this.currentUser = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    console.log('this.currentUser  :', this.currentUser );
  this.getClasses()

  }


  viewAttendance(){
    Notiflix.Loading.arrows();
    let std_id = this.currentUser.data.type == 'student' ? this.currentUser.data._id : '';
this.api.getStdAttendance(this.date,this.class_id,std_id).subscribe((res:any)=>{
  Notiflix.Loading.remove();
  if(res.status){
      this.allStudentAtt = res.data.attendance;
      this.allStudentAtt.forEach((element:any) => {
        if(element.status == 'present'){
           element.check = true
          }
          else{
          element.false = true

        }
      });
      if(!(this.allStudentAtt.length > 0)){
        Notiflix.Notify.failure("Data Not Found, Please Try Again..")
      }
    }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
    }
})
  }


  submit(){
    Notiflix.Loading.arrows();
  let attendance:any = [];
    this.allStudentAtt.forEach((element:any) => {
      if(element.check){
        attendance.push({student_id: element.student_id,status: 'present'});
      } else{
        attendance.push({student_id: element.student_id,status: 'absent'});
      }
    });
    let payload = {
      date: this.date,
      class_id:this.class_id,
      attendance: attendance
    }

    this.api.submitStdAttendance(payload).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
          // this.getStudents();
          this.allStudentAtt = [];
          this.date = '';
          this.class_id = '';
          Notiflix.Notify.success("Submitted Successfully...")
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  getStudents(){
      // Notiflix.Loading.arrows();
      this.api.getStudents().subscribe((res:any)=>{
      Notiflix.Loading.remove();
        if(res.status){
          this.allStudents = res.data;
        }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
        }
      })
  }

  getClasses(){
    this.api.getClasses().subscribe((res:any)=>{
      if(res.status){
        this.allClasses = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong..,please try again..")
      }
    })
  }

}
