import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  
  constructor() { }
  ngOnInit(): void {

    this.Jonanek1 = document.getElementById("Jonanek1");
    this.Jonanek2 = document.getElementById("Jonanek2");



    window.addEventListener('keydown', this.Click);
    window.addEventListener('keyup', this.ClickNormal);
    this.Jonanek1.addEventListener('touchstart', this.Click);
    this.Jonanek2.addEventListener('touchstart', this.Click);
    this.Jonanek1.addEventListener('mousedown', this.Click);
    this.Jonanek2.addEventListener('mousedown', this.Click);
    this.Jonanek1.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek1.addEventListener('touchend', this.ClickNormal);
    this.Jonanek2.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek2.addEventListener('touchend', this.ClickNormal); 
  }


  public Click(e: Event): void {
    //e.preventDefault();
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
  

  public ClickNormal(e: Event): void{
    //e.preventDefault();
    this.Clicked = false;

    console.log("oterh " + document.getElementById("Jonanek1"));
    
    this.Jonanek1.classList.replace("none", "block");
    this.Jonanek2.classList.replace("block", "none");
  
  }
}