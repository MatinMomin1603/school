import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Notiflix from 'notiflix';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/common/services/api-service.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-class-fee-structure',
  templateUrl: './class-fee-structure.component.html',
  styleUrls: ['./class-fee-structure.component.scss']
})
export class ClassFeeStructureComponent implements OnInit {

  name:any;
  currentflow:any = 1;
  class_id:any = '';
  fee:any = '';
  category:any = '';
  allFees:any = [];
  currentData:any = {};
  allClasses:any = [];
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllFees();
    this.getClasses();
  }

  getAllFees(){
    Notiflix.Loading.arrows();
    this.api.getClassFeeStructure().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.allFees = res.data;
        console.log('this.allFees :', this.allFees);
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
     }
     this.api.addClassFeeStructure(data).subscribe((res:any)=>{
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
     amount: this.fee,
    }
    this.api.updateClassFeeStructure(data,this.currentData._id).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
         this.modalService.dismissAll();
         this.getAllFees();
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  edit(content:any,data:any){
    this.currentflow = 2;
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


   
  downloadIndiVidual(data:any){
    let bodyData:any = [
      [{text: 'Sr No',style: 'tableHeader'},{text: 'Class',style: 'tableHeader'},{text: 'Fee',style: 'tableHeader'}]
    ];
    bodyData.push(['1',data.name ? data.name: '',data.amount ? data.amount: '']);
    
    this.pdfDownload(bodyData);
    }

  downloadPdf(){
    if(this.allFees.length > 0){
      let bodyData:any = [
        [{text: 'Sr No',style: 'tableHeader'},{text: 'Class',style: 'tableHeader'},{text: 'Fee',style: 'tableHeader'}]
      ];
    this.allFees.forEach((element:any,key:any) => {
      bodyData.push([key+1,element.name ? element.name: '',element.amount ? element.amount: '']);
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
        {text: "Little Heart's School\n Pethvadgaon",style:'title' },
        ,{
          
          style: 'tableExample',
          table: {
              widths: ['*','*','*'],
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
