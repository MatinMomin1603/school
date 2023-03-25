import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss']
})
export class UpdateResultComponent implements OnInit {

  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
  }

}
