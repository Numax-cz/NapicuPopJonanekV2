import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';
interface ArrayList {
  title: string,
  cena: string | number,
  img: string,
  owned: boolean,
  CBuy: boolean
}

@Component({
  selector: 'app-shop-background',
  templateUrl: './shop-background.component.html',
  styleUrls: ['./shop-background.component.scss']
})
export class ShopBackgroundComponent implements OnInit {


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
      if (e.img === JonanekComponent.song) {
        this.SelectSongRename(e);
      }
    });
  }


  get Song(): string { //ToDO Fix
    return JonanekComponent.song;
  }

  protected SelectSong(i: ArrayList) {
    this.SelectSongRename(i);
    JonanekComponent.song = i.img;
    window.localStorage.setItem("song", i.img);
    JonanekComponent.LoadSound();
    ShopComponent.PlaySelectSound();
    this.Check();
  }

  protected SelectSongRename(i: ArrayList) {
    i.cena = "Vybraný";
  }



  public Buy(i: ArrayList): void {
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


  items: ArrayList[] = [
    {
      title: "JonánekSmích",
      cena: 0,
      img: "/assets/Jonanek2.webp",
      owned: false,
      CBuy: false
    },
    {
      title: "JonánekSmile",
      cena: 50,
      img: "/assets/JonanekSmile2.jpg",
      owned: false,
      CBuy: false
    },


  ]
}
