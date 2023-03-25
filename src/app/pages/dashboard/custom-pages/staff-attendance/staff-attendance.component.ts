import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.scss']
})
export class StaffAttendanceComponent implements OnInit {
  staffAttendance: any = [];
  date: any = '';
  present: any = false;
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAttendance();
  }



  getAttendance(){
    Notiflix.Loading.arrows();
    this.api.getStaffAttendance().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
       this.staffAttendance = res.data;
       console.log('this.staffAttendance  :', this.staffAttendance );
       this.staffAttendance.forEach((element:any) => {
        if(element.status == 'present'){
          element.check = true;
        }
        else{
          element.check = false;
        }
       });
      }
      else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }

  submit(){
    Notiflix.Loading.arrows();
    let currentUser:any = sessionStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser)
    let payload = {
      date: this.date,
      staff_id: currentUser.data._id,
      status: this.present
    }
    this.api.submitStaffAttendance(payload).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.getAttendance();
          this.staffAttendance = [];
          this.date = '';
          this.present = false;
          Notiflix.Notify.success("Submitted Successfully...")
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }
  
}
