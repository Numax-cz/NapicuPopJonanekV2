import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'napicu-jonanek',
  templateUrl: './jonanek.component.html',
  styleUrls: ['./jonanek.component.scss']
})
export class JonanekComponent implements OnInit {
  protected Counter = window.localStorage.getItem("counter");
  count: number = 0;
  Clicked: boolean = false;
  protected Jonanek1: any;
  protected Jonanek2: any;





  constructor(@Inject(DOCUMENT) private doc: Document) {     
  }


  
  ngOnInit(): void {
    this.Jonanek1 = this.doc.getElementById("Jonanek1");
    this.Jonanek2 = this.doc.getElementById("Jonanek2");

    
    
  }
  
  ngAfterViewInit() {

    console.log(this.Jonanek1);
    console.log(this.Jonanek2);
    
    window.addEventListener('keydown', this.Click);
    this.Jonanek1.addEventListener('touchstart', this.Click);
    this.Jonanek2.addEventListener('touchstart', this.Click);
    this.Jonanek1.addEventListener('mousedown', this.Click);
    this.Jonanek2.addEventListener('mousedown', this.Click);
    this.Jonanek1.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek1.addEventListener('touchend', this.ClickNormal);
    this.Jonanek2.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek2.addEventListener('touchend', this.ClickNormal);
    window.addEventListener('keyup', this.ClickNormal);
    
    
  }
  
  
  
  Click(e: Event): void {
      //e.preventDefault();
    this.Jonanek1 = document.getElementById("Jonanek1");
    this.Jonanek2 = document.getElementById("Jonanek2");
    var x = document.getElementById("Jonanek1");

    if (this.Clicked)
      return; this.Clicked = true; this.count++;
    this.count++;
    this.Jonanek1.classList.replace("block", "none");
    this.Jonanek2.classList.replace("none", "block");


    // this.click.innerHTML = Counter;

    // JonanekSound.cloneNode(true).play();

    //window.localStorage.setItem("counter", this.count.toString());
  }


  ClickNormal(e: Event): void {
    //e.preventDefault();


    this.Jonanek1 = document.getElementById("Jonanek1");
    this.Jonanek2 = document.getElementById("Jonanek2");
    this.Clicked = false;
    this.Jonanek1.classList.replace("none", "block");
    this.Jonanek2.classList.replace("block", "none");

  }
}