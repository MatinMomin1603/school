import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  tableData:any = [];
  tableKey:any = [];
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
    this.getStudentMarks('');

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

          getDownloadPDf(data:any){
          console.log('data :', data);
            Notiflix.Loading.arrows();
            this.api.getPerformancePDF(data.student_id,data.class_id).subscribe((res:any)=>{
              if(res.status){
                 this.callPdfData(res,data.name+' '+data.middle_name+' '+data.last_name,data.class);
                Notiflix.Loading.remove()
              }
            })
          }
          callPdfData(tempData:any,student:any,classs:any){
            let data:any=[];
            this.tableData = [];
            this.tableKey = [];
          data.push({text: "Little Heart's School\n Pethvadgaon",style:'title' });
            let student_name = student;
            let class_name = classs;
            let subtitle:any =    {
              alignment: 'justify',
           columns: [
             {
               text: 'Student Name:- '+student_name,
               style: 'margin_top'
             },
             {
               text: 'Class Name-: '+class_name,
               style: 'margin_top'
             },     
           ],
           style:'margin_top'
           }
           data.push(subtitle);
          
        Object.keys(tempData.data).forEach((element:any)=>{
          let value:any={}
           value = tempData.data[element];
          this.tableKey.push(element);
          this.tableData.push({[element]: value})
        })
        
        this.tableData.forEach((table:any,key:any) => {
          let subtitle2:any =  {};
          let table_data = {
            style: 'tableExample',
            table: {
                 widths: ['*','*','*','*'],
              body: [
              [{text: 'Sr No',style: 'tableHeader'},{text: 'Subject Name',style: 'tableHeader'},{text: 'Obtained Marks',style: 'tableHeader'},{text: 'Out Of Marks',style: 'tableHeader'}],
              ]
            },
            layout: {
                
              fillColor: function (rowIndex:any, node:any, columnIndex:any) {
                return (rowIndex === 0) ? '#323742' : null;
              }
            }
          };
          console.log('table[this.tableKey[key]] :', table[this.tableKey[key]]);
          table[this.tableKey[key]].forEach((element1:any,key1:any) => {
            subtitle2 = {
              alignment: 'justify',
              columns: [
                {
                  text: 'Exam Name:-'+this.tableKey[key]
                },
              ],
               style: 'margin_top'
            }
          table_data.table.body.push([{text:key1+1,style: ''},{text:element1.subject_name,style:''}, {text:element1.obtained_mark,style:''}, {text:element1.out_of,style:''}])
          });
          data.push(subtitle2);
          data.push(table_data);
        });
        data.push({text:'Mark Performance-: ',style: 'margin_top'});
          data.push({image:'data:image/jpeg;base64,'+tempData.mark,width:400,style: 'margin_top'});
          data.push({text:'Attendance Performance-: ',style: 'margin_top2',pageBreak: 'before'});
          data.push({image:'data:image/jpeg;base64,'+tempData.attendance,width:400,style: 'margin_top'});
          console.log('data :', data);
            this.pdfDownload(data);
          }
        
          pdfDownload(data:any){
             
            var dd:any = {
              pageSize: 'A4',
                pageMargins: [15, 15, 15, 15],
                pageOrientation: 'portrait',
                pageBreakBefore: 1,
                  footer: {
              columns: [
                { text: "Little Heart's School Pethvadgaon, Kolhapur", alignment: 'center' }
              ]
            },
            content: data,
            styles: {
                title: {
                    color: 'black',
                    bold: true,
                    fontSize: 19,alignment: 'center'
                },
                tableExample:{
                   margin:[0,10,0,0],
                  
                },
                tableHeader:{
                  color: 'white',
                  bold: true,
                    margin: [1,12]
                }
                ,margin_top:{
                    margin:[0,20,0,0]
                },
                margin_top2:{
                  margin:[0,50,0,0]
              },
                blank:{
                    color: 'white',
                    margin: [10,5,0,0]
                }
            }
            
            }
            
            pdfMake.createPdf(dd).open();
          }
}
