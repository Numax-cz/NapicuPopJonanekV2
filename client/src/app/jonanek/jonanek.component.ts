import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'napicu-jonanek',
  templateUrl: './jonanek.component.html',
  styleUrls: ['./jonanek.component.scss']
})


export class JonanekComponent implements OnInit {
  protected static Counter: number = window.localStorage.getItem("counter") as any || 0;
  protected Clicked: boolean = false;
  protected Jonanek1: any;
  protected Jonanek2: any;
  protected static buffer: AudioBuffer;
  protected static ctx: AudioContext = new AudioContext();
  protected static gainNode: GainNode = JonanekComponent.ctx.createGain();


  public static song: string = window.localStorage.getItem("song") || "/assets/sounds/nevim.wav";
  public static xhr: XMLHttpRequest = new XMLHttpRequest()

  protected static Move: boolean;
  SessionCounter: number = 0;
  static count: number = JonanekComponent.Counter | 0; //Money
  worldCounter: number = 0;
  readonly URL = "https://popjonanek.napicu.eu/api/update";



  constructor(@Inject(DOCUMENT) private doc: Document, private http: HttpClient, private route: ActivatedRoute) {
    JonanekComponent.LoadSound();
    JonanekComponent.Move = (!this.route.routeConfig?.path) ? true : false;
  }

  ngOnInit(): void {
    this.Jonanek1 = this.doc.getElementById("Jonanek1");
    this.Jonanek2 = this.doc.getElementById("Jonanek2");
    this.getApiData();
    setInterval(() => {
      this.getApiData();
    }, 1000 * 10);




  }

  get count(): number {
    return JonanekComponent.count;
  }

  ngAfterViewInit(): void {
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

  static Set(): void {
    window.localStorage.setItem("counter", JonanekComponent.count.toString());
  }

  public static LoadSound(): void {
    JonanekComponent.gainNode.connect(JonanekComponent.ctx.destination);
    this.xhr.open('GET', JonanekComponent.song, true);
    this.xhr.responseType = 'arraybuffer';
    this.xhr.send();
    this.xhr.onload = function () {
      JonanekComponent.ctx.decodeAudioData(this.response, function (b) {
        JonanekComponent.buffer = b;
      });
    }
  }

  protected Click = (e: Event): void => {
    //e.preventDefault();
    if (JonanekComponent.Move) {
      if (this.Clicked) return; this.Clicked = true; JonanekComponent.count++
      this.SessionCounter++;
      this.Jonanek1.classList.replace("block", "none");
      this.Jonanek2.classList.replace("none", "block");
      JonanekComponent.playSound(JonanekComponent.buffer);
      JonanekComponent.Set();
    }
  }

  protected ClickNormal = (e: Event): void => {
    //e.preventDefault();
    if (JonanekComponent.Move) {
      this.Clicked = false;
      this.Jonanek1.classList.replace("none", "block");
      this.Jonanek2.classList.replace("block", "none");
    }
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
    });
    this.SessionCounter = 0;
  }
}

