import { Component, OnInit } from '@angular/core';
declare const $zopim: any;
declare const zE: any;
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openchat(): void {
    //zE('messenger', 'open');
     $zopim.livechat.window.show();
  }

}
