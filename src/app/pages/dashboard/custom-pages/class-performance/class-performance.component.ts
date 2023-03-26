import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-class-performance',
  templateUrl: './class-performance.component.html',
  styleUrls: ['./class-performance.component.scss']
})
export class ClassPerformanceComponent implements OnInit {
  classPerformanceImage:any = '';
  currentFlow:any = 1;
  allClasses:any = [];
  class_id:any = 'All';
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getClasses();
    this.getClassWisePerformance();
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

  getClassWisePerformance(class_id:any =''){
    Notiflix.Loading.arrows();
    this.api.getclassWisePerformance(class_id).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.classPerformanceImage = res.data
        console.log('this.classPerformanceImage :', this.classPerformanceImage);
      }else{
        this.classPerformanceImage = ''
        Notiflix.Notify.failure("No Data Found, Please Try Again..")
      }
    })
  }

}
