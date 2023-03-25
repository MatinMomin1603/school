import { Component, OnInit } from '@angular/core';
import Notiflix from 'notiflix';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import { HttpClient } from '@angular/common/http';
// import * as data from '../../../../../en.json';
@Component({
  selector: 'app-add-medical-world',
  templateUrl: './add-medical-world.component.html',
  styleUrls: ['./add-medical-world.component.scss']
})
export class AddMedicalWorldComponent implements OnInit {
  medicalDate:any;
  medicalWorld:any;
  enabled:boolean = false;
  allMedicalWord: any = [];
  totalRecords: any;
  page:number = 1;
  per_page:number = 10;
  searchData:any;
  searchData_en:any;
  searchedData:any;
  currentDateIndex:any= 0;
  dates:any = [
    {
      'day': 'Sunday',
      'limit': 7, 
      },
    {
    'day': 'Monday',
    'limit': 4, 
    },
    {
    'day': 'Tuesday',
    'limit': 5, 
    },
    {
    'day': 'Wednesday',
    'limit': 5, 
    },
    {
    'day': 'Thursday',
    'limit': 6, 
    },
    {
    'day': 'Friday',
    'limit': 6, 
    },
    {
    'day': 'Saturday',
    'limit': 7, 
    },
 
]
  constructor(public api: ApiServiceService,public http: HttpClient) { }

  ngOnInit(): void {
    this.getMedicalWord('',this.page);
  
  }

  submit(){
    console.log('this.medicalDate :', this.medicalDate);
    if(!this.medicalDate){
      Notiflix.Notify.failure('Choose Date...');
    }else if(!this.medicalWorld){
      Notiflix.Notify.failure('Please Add Medical Word...');
    }else{
      Notiflix.Loading.arrows();
      let data = {
        text: this.medicalWorld,
        date: this.medicalDate,
      }
      this.api.addMedicalWord(data).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status){
         Notiflix.Notify.success('Word Added Successfully..');
        this.getMedicalWord('',this.page);
        this.medicalWorld = '';
        this.medicalDate= '';
        }else{
         Notiflix.Notify.failure(res.message);

        }
      })

    }
  }

  changeDate(){
    Notiflix.Loading.arrows();
    this.currentDateIndex = new Date(this.medicalDate).getDay();
    console.log('this.dates[this.currentDateIndex].limit :', this.dates[this.currentDateIndex].limit);
    this.http.get('assets/di.json').subscribe((data:any) => {
      this.searchData_en = data.filter((item:any)=>{
           return item.length == this.dates[this.currentDateIndex].limit;
          });
          Notiflix.Loading.remove();
        });
  }

  getMedicalWord(date:any,page:any){
    Notiflix.Loading.arrows();
    this.api.getMedicalWord(date,page).subscribe((res:any)=>{
      if(res.status){
      Notiflix.Loading.remove();
      this.allMedicalWord = res.data;
    }else{
      Notiflix.Loading.remove();
      Notiflix.Notify.failure('Something Went Wrong, Please Try Again..');
    }
   })
  }

  pageChange(page:any){
    this.page = page;
    this.getMedicalWord('',this.page);
  }

  filter(searchText:string){
  this.searchedData = this.searchData_en.filter((item:any) => {
    return item.toLowerCase().includes(searchText);
  });
  }

  passValue(item:any){
    this.medicalWorld = item;
  }

  deleteMedical(item:any){
    Notiflix.Confirm.show('Do You Want To Delete This Medical Word',item.text,'Delete','No',
    ()=>{
      Notiflix.Loading.arrows();
      this.api.deleteMedical_word(item._id).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status == true){
           Notiflix.Notify.success("Medical Word Deleted Successfully..");
           this.getMedicalWord('',this.page);

        }else{
                 Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
        }
      })
    },
    ()=>{
      
      
    }
    );
  }

}
