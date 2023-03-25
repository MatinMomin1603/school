import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../common/services/api-service.service';

@Component({
  selector: 'app-invioces',
  templateUrl: './invioces.component.html',
  styleUrls: ['./invioces.component.scss']
})
export class InviocesComponent implements OnInit {

  constructor(public api: ApiServiceService) { }

  ngOnInit(): void {
  }

}
