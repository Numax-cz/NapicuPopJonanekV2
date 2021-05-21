import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-shop-sound',
  templateUrl: './shop-sound.component.html',
  styleUrls: ['./shop-sound.component.scss']
})
export class ShopSoundComponent implements OnInit {

  img: string = "assets/sound.png";
  btn: boolean = true;

  constructor() {
    this.Check();
  }

  ngDoCheck(): void {
    this.Check();
  }

  ngOnInit(): void {
    this.Check();
  }



  protected Check(): void {

    this.items.forEach((e: any) => {
      JSON.parse(ShopComponent.OwnedSounds).forEach((i: string) => {
        if (e.title === i) {
          e.owned = true;
          e.cena = "Vybrat";
          return;
        }

        // if (e.sound === JonanekComponent.song) {
        //   this.SelectSong(e);
        // }
      });
      if (e.sound === JonanekComponent.song) {
        this.SelectSongRename(e);
      }
    });
  }

  public Play(e: any): void {
    console.log(e.sound);
    var sound = new Audio(e.sound);
    sound.play();
  }

  get Song(): string {
    return JonanekComponent.song;
  }




  protected SelectSong(i: any) {
    this.SelectSongRename(i);
    JonanekComponent.song = i.sound;
    window.localStorage.setItem("song", i.sound);
    JonanekComponent.LoadSound();
    this.Check();
  }

  protected SelectSongRename(i: any) {
    i.cena = "Vybraný";
  }

  Buy(i: any): void {
    JSON.parse(ShopComponent.OwnedSounds).forEach((e: string) => {
      if (e === i.title) {
        this.SelectSong(i);
        return;
      }
    });
    ShopComponent.Buy(i);
    // this.SelectSong(i);
    // this.Check();
  }


  items = [
    {
      title: "Smích",
      cena: "",
      sound: "/assets/sounds/nevim.wav",
      owned: false
    },
    {
      title: "Vole",
      cena: 100,
      sound: "/assets/sounds/vole.wav",
      owned: false
    },
    {
      title: "Nemam",
      cena: 200,
      sound: "/assets/sounds/nema.wav",
      owned: false

    },
    {
      title: "Zdrave",
      cena: 450,
      sound: "/assets/sounds/zdrave.wav",
      owned: false
    },
    {
      title: "Síla",
      cena: 642,
      sound: "/assets/sounds/sila.wav",
      owned: false

    },
    {
      title: "AAAAAAA",
      cena: 700,
      sound: "/assets/sounds/AAAAAAA.wav",
      owned: false

    },
    {
      title: "Husté",
      cena: 850,
      sound: "/assets/sounds/huste.wav",
      owned: false

    },
    {
      title: "MMA",
      cena: 900,
      sound: "/assets/sounds/mma.wav",
      owned: false

    },
    {
      title: "Plecháč",
      cena: 1000,
      sound: "/assets/sounds/plechac.wav",
      owned: false,
      selected: false

    },
    {
      title: "Picus123",
      cena: 2000,
      sound: "/assets/sounds/Picus123.wav",
      owned: false,
      selected: false
    },
  ]
}
