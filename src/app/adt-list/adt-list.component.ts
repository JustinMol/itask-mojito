import { Component, OnInit } from '@angular/core';
import { AdtService, ADT } from './adt.service';

@Component({
  selector: 'app-adt-list',
  templateUrl: './adt-list.component.html',
  styleUrls: ['./adt-list.component.less']
})
export class AdtListComponent implements OnInit {

  adts: ADT[] = [];

  constructor(
    private adtService: AdtService
  ) {}

  ngOnInit() {
    this.adtService.getADTs().subscribe(adts => {
      this.adts = adts;
    })
  }

}
