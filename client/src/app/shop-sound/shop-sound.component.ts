import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';

export interface ArrayListSound {
  title: string;
  cena: string | number;
  sound: string;
  owned: boolean;
  CBuy: boolean;
}
@Component({
  selector: 'app-shop-sound',
  templateUrl: './shop-sound.component.html',
  styleUrls: ['./shop-sound.component.scss'],
})
export class ShopSoundComponent implements OnInit {
  img: string = 'assets/sound.png';
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
    this.items.forEach((e: ArrayListSound) => {
      JSON.parse(ShopComponent.OwnedSounds).forEach((i: string) => {
        if (e.title === i) {
          e.owned = true;
          e.cena = 'Vybrat';
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

  public Play(e: ArrayListSound): void {
    var sound = new Audio(e.sound);
    sound.play();
  }

  get Song(): string {
    return JonanekComponent.song;
  }

  protected SelectSong(i: ArrayListSound) {
    this.SelectSongRename(i);
    JonanekComponent.song = i.sound;
    window.localStorage.setItem('song', i.sound);
    JonanekComponent.LoadSound();
    ShopComponent.PlaySelectSound();
    this.Check();
  }

  protected SelectSongRename(i: ArrayListSound) {
    i.cena = 'Vybraný';
  }

  public BuySong(i: ArrayListSound): void {
    if (i.CBuy && !i.owned) {
      ShopComponent.PlayErrorSound();
    }

    JSON.parse(ShopComponent.OwnedSounds).forEach((e: string) => {
      if (e === i.title) {
        this.SelectSong(i);
        return;
      }
    });
    ShopComponent.BuySound(i);
  }

  items: ArrayListSound[] = [
    {
      title: 'Smích',
      cena: 0,
      sound: '/assets/sounds/nevim.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Pupek1',
      cena: 50,
      sound: '/assets/sounds/pupek2.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Bum!!',
      cena: 80,
      sound: '/assets/sounds/bum.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Vole',
      cena: 100,
      sound: '/assets/sounds/vole.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Pupek2',
      cena: 150,
      sound: '/assets/sounds/pupek3.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Ha',
      cena: 170,
      sound: '/assets/sounds/ha.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Nemam',
      cena: 200,
      sound: '/assets/sounds/nema.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Zdrave',
      cena: 450,
      sound: '/assets/sounds/zdrave.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Hmmm',
      cena: 500,
      sound: '/assets/sounds/hm.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Hahaha',
      cena: 580,
      sound: '/assets/sounds/hahaha.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Síla',
      cena: 642,
      sound: '/assets/sounds/sila.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'AAAAAAA',
      cena: 700,
      sound: '/assets/sounds/AAAAAAA.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Nechtěl bych',
      cena: 725,
      sound: '/assets/sounds/nechtelbych.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Husté',
      cena: 850,
      sound: '/assets/sounds/huste.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Se mi laguje telefon',
      cena: 880,
      sound: '/assets/sounds/semilagujetelefon.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'MMA',
      cena: 900,
      sound: '/assets/sounds/mma.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Plecháč',
      cena: 1000,
      sound: '/assets/sounds/plechac.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Picus123',
      cena: 2000,
      sound: '/assets/sounds/Picus123.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Picus123456789',
      cena: 2000,
      sound: '/assets/sounds/picus123456789.wav',
      owned: false,
      CBuy: false,
    },
    {
      title: 'Pupek3',
      cena: 2500,
      sound: '/assets/sounds/pupek1.wav',
      owned: false,
      CBuy: false,
    },
  ];
}
