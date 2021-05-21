import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';

interface ArrayList {
  title: string,
  cena: string | number,
  sound: string,
  owned: boolean,
  CBuy: boolean
}
@Component({
  selector: 'app-shop-sound',
  templateUrl: './shop-sound.component.html',
  styleUrls: ['./shop-sound.component.scss']
})


export class ShopSoundComponent implements OnInit {

  img: string = "assets/sound.png";
  btn: boolean = true;

  constructor() {
    ShopComponent.Load();
  }

  ngDoCheck(): void {
    this.Check();
  }

  ngOnInit(): void {
    this.Check();
  }


  protected Check(): void {


    this.items.forEach((e: ArrayList) => {
      JSON.parse(ShopComponent.OwnedSounds).forEach((i: string) => {
        if (e.title === i) {
          e.owned = true;
          e.cena = "Vybrat";
          return;
        }
        if (e.cena >= JonanekComponent.count && !e.owned) {
          e.CBuy = true;
          return;
        }
      });
      if (e.sound === JonanekComponent.song) {
        this.SelectSongRename(e);
      }
    });
  }

  public Play(e: ArrayList): void {
    console.log(e.sound);
    var sound = new Audio(e.sound);
    sound.play();
  }

  get Song(): string {
    return JonanekComponent.song;
  }

  protected SelectSong(i: ArrayList) {
    this.SelectSongRename(i);
    JonanekComponent.song = i.sound;
    window.localStorage.setItem("song", i.sound);
    JonanekComponent.LoadSound();
    ShopComponent.SelectSound();
    this.Check();
  }

  protected SelectSongRename(i: ArrayList) {
    i.cena = "Vybraný";
  }



  public Buy(i: ArrayList): void {
    if (i.CBuy && !i.owned) {
      ShopComponent.ErrorSound();
    }

    JSON.parse(ShopComponent.OwnedSounds).forEach((e: string) => {
      if (e === i.title) {
        this.SelectSong(i);
        return;
      }
    });
    ShopComponent.Buy(i);
  }


  items: ArrayList[] = [
    {
      title: "Smích",
      cena: 0,
      sound: "/assets/sounds/nevim.wav",
      owned: false,
      CBuy: false
    },
    {
      title: "Vole",
      cena: 100,
      sound: "/assets/sounds/vole.wav",
      owned: false,
      CBuy: false
    },
    {
      title: "Nemam",
      cena: 200,
      sound: "/assets/sounds/nema.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "Zdrave",
      cena: 450,
      sound: "/assets/sounds/zdrave.wav",
      owned: false,
      CBuy: false
    },
    {
      title: "Síla",
      cena: 642,
      sound: "/assets/sounds/sila.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "AAAAAAA",
      cena: 700,
      sound: "/assets/sounds/AAAAAAA.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "Husté",
      cena: 850,
      sound: "/assets/sounds/huste.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "MMA",
      cena: 900,
      sound: "/assets/sounds/mma.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "Plecháč",
      cena: 1000,
      sound: "/assets/sounds/plechac.wav",
      owned: false,
      CBuy: false

    },
    {
      title: "Picus123",
      cena: 2000,
      sound: "/assets/sounds/Picus123.wav",
      owned: false,
      CBuy: false
    },
  ]
}