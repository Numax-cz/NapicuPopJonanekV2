import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'napicu-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  worldCounter: number = 49;
  constructor() { }

  ngOnInit(): void {
  }

}
