import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Notiflix from 'notiflix';
import { ApiServiceService } from 'src/app/common/services/api-service.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pay-out',
  templateUrl: './pay-out.component.html',
  styleUrls: ['./pay-out.component.scss']
})
export class PayOutComponent implements OnInit {

  name:any;
  currentflow:any = 1;
  description:any = '';
  remain_fee:any = '';
  amount:any = '';
  category:any = '';
  date:any = '';
  allPayout:any = [];
  currentData:any = {};
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllPayOut()
  }

  getAllPayOut(){
    Notiflix.Loading.arrows();
    this.api.getPayOut().subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.allPayout = res.data;
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })
  }
  submit(){
    Notiflix.Loading.arrows();
     let data = {
      date: this.date,
      description: this.description,
      category: this.category,
      amount: this.amount * 1
     }
     this.api.addPayOut(data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
         this.modalService.dismissAll();
         this.getAllPayOut();
        Notiflix.Notify.success("Fee Added Successfully..");
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
     })
  }

  update(){
    Notiflix.Loading.arrows();
    let payload = {
     _id : this.currentData._id,
     amount: this.amount,
     date: this.date,
     category: this.category,
     description: this.description
    }
    this.api.updateFeeStructure(payload).subscribe((res:any)=>{
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
    this.amount = '';
    this.date = '';
    this.description = '';
    this.category = '';
    this.currentflow = 1;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  
  edit(content:any,data:any){
    this.currentData= data;
    this.amount = data.amount;
    this.date = data.date;
    this.date = data.date;
    this.category = data.category;
    this.currentflow = 2;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  delete(data:any){

  }

  downloadPDf(){
    // playground requires you to assign document definition to a variable called dd
    if(this.allPayout.length > 0){
      let bodyData:any = [
        [{text: 'Sr No',style: 'tableHeader'},{text: 'Amount',style: 'tableHeader'},{text: 'Date',style: 'tableHeader'},{text: 'Category',style: 'tableHeader'},{text: 'Desciption',style: 'tableHeader'}]
      ];
      this.allPayout.forEach((element:any,key:any) => {
        bodyData.push([key+1,element.amount ? element.amount : '',element.date ? element.date: '',element.category ? element.category : '',element.description ? element.description: ''])
      });

      this.pdfDownload(bodyData);
    }

  }

  downloadSingleData(data:any){
    let bodyData:any = [
      [{text: 'Sr No',style: 'tableHeader'},{text: 'Amount',style: 'tableHeader'},{text: 'Date',style: 'tableHeader'},{text: 'Category',style: 'tableHeader'},{text: 'Desciption',style: 'tableHeader'}]
    ];
    bodyData.push(['1',data.amount ? data.amount : '',data.date ? data.date: '',data.category ? data.category : '',data.description ? data.description: '']);
    
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
      ,{
        
        style: 'tableExample',
        table: {
            widths: ['*','*','*','*','*'],
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
