import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
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
  category:any = '';
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
      student_id: this.roll_no,
      category: this.category
     }
     this.api.addFeeStructure(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
         this.modalService.dismissAll();this.getAllFees();
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

  downloadIndiVidual(data:any){
    let bodyData:any = [
      [{text: 'Sr No',style: 'tableHeader'},{text: 'Student Name',style: 'tableHeader'},{text: 'Class',style: 'tableHeader'},{text: 'Category',style: 'tableHeader'},{text: 'Fee',style: 'tableHeader'},{text: 'Date',style: 'tableHeader'}]
    ];
    bodyData.push(['1',data.name ? data.name : '',data.class_name ? data.class_name: '',data.category ? data.category: '',data.amount ? data.amount: '',data.created_at ? data.created_at.slice(0,10): '']);
    
    this.pdfDownload(bodyData);
    }

  downloadPdf(){
    if(this.allFees.length > 0){
    let bodyData:any = [
      [{text: 'Sr No',style: 'tableHeader'},{text: 'Student Name',style: 'tableHeader'},{text: 'Class',style: 'tableHeader'},{text: 'Category',style: 'tableHeader'},{text: 'Fee',style: 'tableHeader'},{text: 'Date',style: 'tableHeader'}]
    ];
    this.allFees.forEach((element:any,key:any) => {
      bodyData.push(['1',element.name ? element.name : '',element.class_name ? element.class_name: '',element.category ? element.category: '',element.amount ? element.amount: '',element.created_at ? element.created_at.slice(0,10): '']);
    });
    
    this.pdfDownload(bodyData);
  }
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
      content: [
        {text: "Little Herat's School\n Pethvadgaon",style:'title' },
        ,{
          
          style: 'tableExample',
          table: {
              widths: ['*','*','*','*','*','*'],
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
          tableExample:{
             // alignment: 'center'
             margin:[0,50,0,0]
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
}
