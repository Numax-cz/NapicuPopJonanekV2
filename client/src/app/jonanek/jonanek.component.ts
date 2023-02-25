import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {GlobalUpdate} from '../api';
import {NapicuPopJonanekControllerService} from "@Napicu/OpenAPI/api/napicuPopJonanekController.service";
import {RequestExceptionSchema} from "@Napicu/OpenAPI/model/requestExceptionSchema";


@Component({
  selector: 'napicu-jonanek',
  templateUrl: './jonanek.component.html',
  styleUrls: ['./jonanek.component.scss'],
})
export class JonanekComponent implements OnInit {
  protected static Counter: number;
  protected Clicked: boolean = false;
  protected Jonanek1: any;
  protected Jonanek2: any;
  protected static buffer: AudioBuffer;
  protected static ctx: AudioContext = new AudioContext();
  protected static gainNode: GainNode = JonanekComponent.ctx.createGain();
  public static shopOpen: boolean;
  public static song: string;
  public static IsMenuOpen: boolean = false;
  public static xhr: XMLHttpRequest = new XMLHttpRequest();
  public static background1: string;
  public static background2: string;

  public static SoundsVoice: boolean;
  protected static Move: boolean;
  SessionCounter: number = 0;
  static count: number;
  worldCounter: number = 0;
  public err: string | null = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private service: NapicuPopJonanekControllerService,
    public route: ActivatedRoute,
  ) {
    JonanekComponent.Load();
    JonanekComponent.shopOpen = true;
    JonanekComponent.Move = !this.route.routeConfig?.path ? true : false;
  }

  ngOnInit(): void {
    this.Jonanek1 = this.doc.getElementById('Jonanek1');
    this.Jonanek2 = this.doc.getElementById('Jonanek2');
    // this.getApiData();
    // setInterval(() => {
    //   this.getApiData();
    // }, 1000 * 10);

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

  public static Load(): void {
    var Song = window.localStorage.getItem('song') || '/assets/sounds/nevim.wav';
    this.song = Song;
    this.Counter = (window.localStorage.getItem('counter') as any) || 0;
    this.count = JonanekComponent.Counter | 0;
    this.LoadAllVoice();
    this.LoadSound();
    this.LoadBackground();
  }

  get count(): number {
    return JonanekComponent.count;
  }

  get background1(): string {
    return JonanekComponent.background1;
  }
  get background2(): string {
    return JonanekComponent.background2;
  }


  public static SetCounter(): void {
    window.localStorage.setItem('counter', JonanekComponent.count.toString());
  }
  public static OffVoice(): void {
    window.localStorage.setItem('allsound', 'false');
    this.LoadAllVoice();
  }
  public static OnVoice(): void {
    window.localStorage.removeItem('allsound');
    this.LoadAllVoice();
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
    };
  }

  public static LoadBackground(): void {
    var Backgrounds =
      window.localStorage.getItem('background') || '["/assets/Jonanek1.webp", "/assets/Jonanek2.webp"]';
    this.background1 = JSON.parse(Backgrounds)[0];
    this.background2 = JSON.parse(Backgrounds)[1];
  }

  public static LoadAllVoice(): void {
    JonanekComponent.SoundsVoice = !window.localStorage.getItem('allsound') ? true : false;
  }

  protected Click = (e: Event): void => {
    if (JonanekComponent.IsMenuOpen) return;
    e.preventDefault();
    if (JonanekComponent.Move) {
      if (this.Clicked) return;
      this.Clicked = true;
      JonanekComponent.count++;
      this.SessionCounter++;
      this.Jonanek1.classList.replace('block', 'none');
      this.Jonanek2.classList.replace('none', 'block');
      JonanekComponent.playSound(JonanekComponent.buffer);
      JonanekComponent.SetCounter();
    }
  };

  protected ClickNormal = (e: Event): void => {
    if (JonanekComponent.IsMenuOpen) return;
    e.preventDefault();
    if (JonanekComponent.Move) {
      this.Clicked = false;
      this.Jonanek1.classList.replace('none', 'block');
      this.Jonanek2.classList.replace('block', 'none');
    }
  };

  public static CheckBeforePlaySn(): boolean {
    if (JonanekComponent.SoundsVoice) {
      return true;
    }
    return false;
  }

  protected static playSound(buf: AudioBuffer): void {
    if (JonanekComponent.CheckBeforePlaySn()) {
      var source = JonanekComponent.ctx.createBufferSource();
      source.buffer = buf;
      source.connect(JonanekComponent.gainNode);
      source.onended = function () {
        if (this.stop) this.stop();
        if (this.disconnect) this.disconnect();
      };
      source.start(0);
    }
  }

  protected getApiData(): void {
    this.service.setGetCounter({counter: this.SessionCounter}).subscribe((data) => {
      this.worldCounter = data.counter;
    }, (error: HttpErrorResponse) => {
      let api_err = error.error as RequestExceptionSchema;
      this.err = null;
      if(api_err?.status == HttpStatusCode.TooManyRequests){
        this.err = "Příliš mnoho požadavků z vaší IPadresy. Zkuste to prosím později :)";
      } else this.err = "Server je momentálně nedostupný :("
    });
    this.SessionCounter = 0;
  }
}
