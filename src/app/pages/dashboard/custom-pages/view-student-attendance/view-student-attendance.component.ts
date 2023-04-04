import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Notiflix from 'notiflix';
import { ApiServiceService } from 'src/app/common/services/api-service.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-view-student-attendance',
  templateUrl: './view-student-attendance.component.html',
  styleUrls: ['./view-student-attendance.component.scss']
})
export class ViewStudentAttendanceComponent implements OnInit {
  @ViewChild('tableDetails') tableDetails !: ElementRef;

  date:any = '';
  allStudents:any = [];
  currentFlow:any = 1; 
  class_id:any = '';
  class_filter:any = '';
  allClasses:any = [];
  allStudentAtt:any = [];
  allStudentAttClone:any = [];
  allStudentAttDate:any = [];
  currentUser:any = {};
  show_table:any = false;
  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
    // this.getStudents();
    this.currentUser = sessionStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.viewAttendance();
  this.getClasses();
  if(this.currentUser.type == 'student'){
    this.getIndiStudentAtten(this.currentUser.data._id);
  }

  }


  viewAttendance(){
    Notiflix.Loading.arrows();
this.api.getStdAttendanceView().subscribe((res:any)=>{
  Notiflix.Loading.remove();
  if(res.status){
      this.allStudentAtt = res.data;
      this.allStudentAttClone = JSON.parse(JSON.stringify(res.data));
      this.allStudentAtt.forEach((element:any) => {
      element.show = false;
      });
      if(!(this.allStudentAtt.length > 0)){
        Notiflix.Notify.failure("Data Not Found, Please Try Again..")
      }
    }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
    }
})
  }
  viewAttendancewithdate(data:any,content: any){
    Notiflix.Loading.arrows();
    const divEl: HTMLDivElement = this.tableDetails.nativeElement;
    this.api.getStdAttendance(data.date,data.class_id).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.show_table = true;
        this.allStudentAttDate = res.data.attendance;
        divEl.scrollIntoView({behavior: 'smooth'});
        if(content == 'pdf'){
          this.downloadSingleData()
        }
      if(!(this.allStudentAttDate.length > 0)){
        Notiflix.Notify.failure("Data Not Found, Please Try Again..")
      }
    }else{
      Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
    }
})
  }

  getIndiStudentAtten(id:any){
    Notiflix.Loading.arrows();
    this.api.getIndiStudentAtten(id).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
          this.allStudentAtt = res.data;
      this.allStudentAttClone = JSON.parse(JSON.stringify(res.data));
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

  downloadSingleData(){
    let bodyData:any = [
      [{text: 'Sr No',style: 'tableHeader'},{text: 'Student Name',style: 'tableHeader'},{text: 'Date',style: 'tableHeader'},{text: 'Attendance',style: 'tableHeader'}]
    ];

    this.allStudentAttDate.forEach((element:any,key:any) => {
      bodyData.push([key + 1,element.name ? element.name : '',element.created_at ? element.created_at.split(' ')[0]: '',element.status ? element.status: '']);
    });
    
    this.pdfDownload(bodyData);

  }

  pdfDownload(data:any){
    var dd:any = {
      pageSize: 'A4',
        pageMargins: [15, 15, 15, 15],
        pageOrientation: 'portrait',
        pageBreakBefore: 1,
          footer: {
      columns: [
        { text: "Little Herat's School Pethvadgaon, Kolhapur", alignment: 'center' }
      ]
    },
    content: [
      {text: "Little Herat's School\n Pethvadgaon",style:'title' },
      {text: "Student Attendance-: ",style:'sub_title' },
      ,{
        
        style: 'tableExample',
        table: {
            widths: ['*','*','*','*'],
          body: data,
        
        },
        layout: {
          fillColor: function (rowIndex:any, node:any, columnIndex:any) {
            return (rowIndex  === 0) ? '#323742' : null;
          }
        }
      
    }
    ],
    styles: {
        title: {
            color: 'black',
            bold: true,
            fontSize: 19,alignment: 'center'
        },
        sub_title: {
            color: 'black',
            bold: false,
            fontSize: 16,alignment: 'left',
           margin:[0,50,0,10]

        },
        tableExample:{
           // alignment: 'center'
        },
        tableHeader:{
          color: 'white',
          bold: true,
            margin: [12,5]
        }
    }
    
    }
    
    pdfMake.createPdf(dd).open();
  }

  filerAttendance(filter_base_key:any){
  console.log('filter_base_key :', filter_base_key);
  // this.allStudentAtt = JSON.parse(JSON.stringify(this.allStudentAttClone));
  if(filter_base_key == 'class_id'){
    this.allStudentAtt = this.allStudentAtt.filter((element:any)=>  element[filter_base_key] == this.class_filter)
  }else{
    console.log('this.date :', this.date);
    this.allStudentAtt = this.allStudentAtt.filter((element:any)=> {
      console.log('element[filter_base_key].split(\'-\')[1] :', element[filter_base_key].split('-')[1]);
     return element[filter_base_key].split('-')[1] == this.date
    } 
    )
  }
  }

  clearFilter(){
    this.date = '';
    this.class_filter = '';
    this.allStudentAtt = JSON.parse(JSON.stringify(this.allStudentAttClone));
  }
}
