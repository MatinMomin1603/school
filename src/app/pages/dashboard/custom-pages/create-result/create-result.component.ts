import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {
  currentFlow:any = 1;
  class_id:any = '';
  student_id:any = '';
  term_id:any = '';
  currentUser:any = {};
  allClasses:any = [];
  allMarks:any = [];
  allStudent:any = [];
  allTerm:any = [];
  getStudentMarksList:any = [];
  std_id:any= '';
  constructor(public api:ApiServiceService) { }

  ngOnInit(): void {
    this.getClasses();
    this.getAllTerms();
    this.currentUser = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    if(this.currentUser.type == 'student'){
      this.std_id = this.currentUser.data._id;
    }
    this.getStudentMarks(this.std_id);

  }

  changeFlow(view:any){
    this.currentFlow = view;
  }

  submit(){
    Notiflix.Loading.arrows();
    let marks:any = [];
    this.allMarks.forEach((element:any) => {
      marks.push({
        subject_id: element._id,
        obtained_mark: element.obtained_marks *1,
        out_of:element.out_of * 1
      })
    });
    console.log('this.allMarks :', this.allMarks);
  
    let payload = {
      class_id: this.class_id,
      exam_id: this.term_id,
      student_id: this.student_id,
      marks: marks
    }

    this.api.submitMarks(payload).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.currentFlow = 1;
        Notiflix.Notify.success("Marks Submitted Successfullly..");
      }else{
        this.currentFlow = 1;
        Notiflix.Notify.failure("Marsk Already Available..");
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

  getAllTerms(){
    Notiflix.Loading.arrows();
    this.api.getTerms().subscribe((res:any)=>{
          Notiflix.Loading.remove();
          if(res.status){
             this.allTerm = res.data;
          }
          else{
            Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
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

          getSubject(){
            Notiflix.Loading.arrows();
            this.api.getSubjects().subscribe((res:any)=>{
            Notiflix.Loading.remove();
              if(res.status){
                this.allMarks = res.data
                this.allMarks.forEach((element:any) => {
                  element.obtained_marks = '';
                  element.out_of = '';

                });
                console.log('this.allMarks :', this.allMarks);
              }else{
              Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
              }
            })
          }

          getStudentMarks(std_id:any){
          console.log('std_id :', std_id);
            Notiflix.Loading.arrows();
            this.api.getStudentMarks(std_id).subscribe((res:any)=>{
            Notiflix.Loading.remove();
              if(res.status){
                this.getStudentMarksList = res.data;
              }
              else{
              Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
              }
            })
          }

}
