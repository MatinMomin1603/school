import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import Notiflix from 'notiflix';
import { ApiServiceService } from 'src/app/common/services/api-service.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  sendTo:any = [];
  allNotice:any = [];
  listType:any = 'All';
  sendToArray:any = [{
    check: false,
    label: ' Staff',
    value: 'staff'
  },
  {
    check: false,
    label: ' Student',
    value: 'student'
  }]
  currentflow:any = 1;
  text:any = '';
  currentUser:any = {};
  constructor(public modalService: NgbModal,public api: ApiServiceService) { }

  ngOnInit(): void {
    this.getNotice();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
  }


  closeModal(){
    this.modalService.dismissAll();
  }

  openModal(content:any){
    this.sendTo = [];
    this.currentflow = 1;
    this.text = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  submit(){
    Notiflix.Loading.arrows();
    this.sendTo=[];
    this.sendToArray.forEach((element:any) => {
      if(element.check){
        this.sendTo.push(element.value);
      }
    });
    let payload = {
      to: this.sendTo,
      text: this.text
    }
    console.log('payload :', payload);
    this.api.addNotice(payload).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        Notiflix.Notify.success(res.message);
        this.modalService.dismissAll();
        this.getNotice();
      }else{
        Notiflix.Notify.warning(res.message);
      }
    },(error)=>{
    console.log('error :', error);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Something Went Wrong");
    })

  }

  getNotice(){
    Notiflix.Loading.arrows();
    let data:any=[];
    if(this.listType == 'All')
    data = ['staff','student'];
    else if(this.listType == 'student')
    data = ['student'];
    else
    data = ['staff'];
    this.api.getNotices(data).subscribe((res:any)=>{
     Notiflix.Loading.remove();
     if(res.status){
     this.allNotice = res.data;
     this.allNotice.forEach((element:any) => {
     element.created_at = new Date( element.created_at * 1000)
     });
     }else{
      Notiflix.Notify.warning(res.message);
     }
   },(error)=>{
   console.log('error :', error);
   Notiflix.Notify.failure('Something Went Wrong..');
   });
  }
}
