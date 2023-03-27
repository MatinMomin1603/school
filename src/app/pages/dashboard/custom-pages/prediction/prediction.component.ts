import { Component, OnInit } from '@angular/core';
import Notiflix from 'notiflix';
import { ApiServiceService } from '../../../../common/services/api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
  extra_activities:any='';
  attendance:any='';
  prediction_output:any='';
  current_mark:any='';
  constructor(public api: ApiServiceService,public modalService: NgbModal) { }

  ngOnInit(): void {
  }


  submit(content: any){
    Notiflix.Loading.arrows();
    let payload = {
      "current_mark":this.current_mark * 1,
      "attendance":this.attendance * 1,
      "extra_activities":this.extra_activities * 1
    }
    this.api.addPrediction(payload).subscribe((res:any)=>{
      Notiflix.Loading.remove();
      if(res.status){
        this.prediction_output = res.data;
        this.current_mark = '';
        this.attendance = '';
        this.extra_activities = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

      }else{
        Notiflix.Notify.failure("Something Went Wrong, Please Try Again..")
      }
    })

  }
}
