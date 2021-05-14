import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"




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
  protected static buffer: AudioBuffer;
  protected static ctx: AudioContext = new AudioContext();
  protected static gainNode: GainNode = JonanekComponent.ctx.createGain();
  protected readonly song: string = "/assets/sounds/nevim.wav";
  protected xhr: XMLHttpRequest = new XMLHttpRequest()

  SessionCounter: number = 0;
  count: number = this.Counter | 0;
  worldCounter: number = 0;
  readonly URL = "https://popjonanek.napicu.eu/api/update";



  constructor(@Inject(DOCUMENT) private doc: Document, private http: HttpClient) {
    JonanekComponent.gainNode.connect(JonanekComponent.ctx.destination);
    this.xhr.open('GET', this.song, true);
    this.xhr.responseType = 'arraybuffer';
    this.xhr.send();
    this.xhr.onload = function () {
      JonanekComponent.ctx.decodeAudioData(this.response, function (b) {
        JonanekComponent.buffer = b;
      });
      JonanekComponent.playSound(JonanekComponent.buffer);
    }
  }



  ngOnInit(): void {
    this.Jonanek1 = this.doc.getElementById("Jonanek1");
    this.Jonanek2 = this.doc.getElementById("Jonanek2");
    this.getApiData();

    setInterval(() => {
      this.getApiData();
    }, 1000 * 10);

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
    this.SessionCounter++;
    this.Jonanek1.classList.replace("block", "none");
    this.Jonanek2.classList.replace("none", "block");
    JonanekComponent.playSound(JonanekComponent.buffer);
    window.localStorage.setItem("counter", this.count.toString());
  }

  protected ClickNormal = (e: Event): void => {
    this.Clicked = false;
    this.Jonanek1.classList.replace("none", "block");
    this.Jonanek2.classList.replace("block", "none");

  }

  protected static playSound(buf: AudioBuffer): void {
    var source = JonanekComponent.ctx.createBufferSource();
    source.buffer = buf;
    source.connect(JonanekComponent.gainNode);
    source.onended = function () { if (this.stop) this.stop(); if (this.disconnect) this.disconnect(); }
    source.start(0);
  }

  protected getApiData(): void {
    this.http.post<any>("https://api.popjonanek.napicu.eu/api/update", { ClickCounter: this.SessionCounter }).subscribe(data => {
      this.worldCounter = data;
      console.log(data);
      
    });
    this.SessionCounter = 0;
  }
}

