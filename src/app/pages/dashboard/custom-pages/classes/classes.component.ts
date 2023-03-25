import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import Notiflix from 'notiflix'
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
allClasses:any= [];
name:any = '';
currentData: any;
currentFlow: any = 1;
 
  constructor(public modalService: NgbModal,public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  openModal(content:any){
    this.name = '';
    this.currentFlow = 1;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit(){
    Notiflix.Loading.arrows();
    let data = {
      name: this.name
    }
    this.api.addClass(data).subscribe((res:any)=>{
      Notiflix.Loading.remove();

      if(res.status){
        this.modalService.dismissAll();
        this.getClasses();
        Notiflix.Notify.success("Class Added Succesfully..")
   
      }else{
        Notiflix.Notify.failure("Something Went Wrong..,please try again..")

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

  closeModal(){
    this.modalService.dismissAll();
  }

  edit(content:any,data:any){
    this.currentFlow = 2;
    this.name = data.name;
    this.currentData = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }
  update(){
    Notiflix.Loading.arrows();
   let data = {
    name : this.name
   }
    this.api.updateClass(this.currentData._id,data).subscribe((res:any)=>{
    Notiflix.Loading.remove();
      if(res.status){
        this.modalService.dismissAll();
        this.getClasses();
       Notiflix.Notify.success('Class Updated Successfully..')
      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })

  }

  delete(data:any){
    Notiflix.Confirm.show('Do You Want To Delete This Class',data.name,'Delete','No',
    ()=>{
      Notiflix.Loading.arrows();
      this.api.deleteClass(data._id).subscribe((res:any)=>{
        Notiflix.Loading.remove();
        if(res.status == true){
           Notiflix.Notify.success("Class Deleted Successfully..");
           this.getClasses();
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
