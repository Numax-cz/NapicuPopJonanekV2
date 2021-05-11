import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'napicu-jonanek',
  templateUrl: './jonanek.component.html',
  styleUrls: ['./jonanek.component.scss']
})
export class JonanekComponent implements OnInit {
  count: number = 0;

  constructor() { }
  ngOnInit(): void {
  }
  Jonanek1 = document.querySelector("#Jonanek1");


  Click(): void {
    alert("xd")
    
  }

}
