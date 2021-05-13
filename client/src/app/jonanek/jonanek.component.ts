import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';





@Component({
  selector: 'napicu-jonanek',
  templateUrl: './jonanek.component.html',
  styleUrls: ['./jonanek.component.scss']
})


export class JonanekComponent implements OnInit {
  protected Counter: number = window.localStorage.getItem("counter") as any || 0;

  protected Clicked: boolean = false;
  protected Jonanek1: any;
  protected Jonanek2: any;

  SessionCounter: number = 0;
  count: number = this.Counter | 0;
  protected Music: HTMLAudioElement = new Audio("/assets/sounds/nevim.mp3");
  readonly URL = "https://popjonanek.napicu.eu/api/update";



  constructor(@Inject(DOCUMENT) private doc: Document) {
   }



  ngOnInit(): void {
    this.Jonanek1 = this.doc.getElementById("Jonanek1");
    this.Jonanek2 = this.doc.getElementById("Jonanek2");
  }

  ngAfterViewInit() {
    window.addEventListener('keydown', this.Click);
    this.Jonanek1.addEventListener('touchstart', this.Click);
    this.Jonanek2.addEventListener('touchstart', this.Click);
    this.Jonanek1.addEventListener('mousedown', this.Click);
    this.Jonanek2.addEventListener('mousedown', this.Click);

    window.addEventListener('keyup', this.ClickNormal);
    this.Jonanek1.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek1.addEventListener('touchend', this.ClickNormal);
    this.Jonanek2.addEventListener('mouseup', this.ClickNormal);
    this.Jonanek2.addEventListener('touchend', this.ClickNormal);

  }
  protected Click = (e: Event): void => {
    if (this.Clicked) return; this.Clicked = true; this.count++
    //this.SessionCounter++; Pro Api
    this.Jonanek1.classList.replace("block", "none");
    this.Jonanek2.classList.replace("none", "block");
    this.PlaySound();
    window.localStorage.setItem("counter", this.count.toString());
  }
  
  protected ClickNormal = (e: Event): void => {
    this.Clicked = false;
    this.Jonanek1.classList.replace("none", "block");
    this.Jonanek2.classList.replace("block", "none");
  }
  
  protected PlaySound = (): void => {



    this.Music.play();
  }


}

