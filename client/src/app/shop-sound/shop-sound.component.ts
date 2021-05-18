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
  
  ngDoCheck(): void{
    this.Check();
  }

  ngOnInit(): void {  }
  

  
  protected Check(): void{
    this.items.forEach((e: any) => {
      JSON.parse(ShopComponent.OwnedSounds).forEach((i: string) => {
        if (e.title === i) {
          e.owned = true;
          e.cena = "Vybrat";
          return;
        }
      });
    });
  }

  public Play(e: any): void {
    console.log(e.sound);
    var sound = new Audio(e.sound);
    sound.play();
  }




  Buy(i: any): void {
    JSON.parse(ShopComponent.OwnedSounds).forEach((e: string) => {
      if (e === i.title) {
        window.localStorage.setItem("song", i.sound);
        JonanekComponent.song = i.sound;
        JonanekComponent.LoadSound();
        return;
      }
      ShopComponent.Buy(i);
    });
  }


  items = [
    {
      title: "Smích",
      cena: "",
      sound: "/assets/sounds/vole.wav",
      owned: false
    },
    {
      title: "Vole",
      cena: 1000,
      sound: "/assets/sounds/vole.wav",
      owned: false
    },
    {
      title: "Nemam",
      cena: 2000,
      sound: "/assets/sounds/nema.wav",
      owned: false

    },
    {
      title: "Zdrave",
      cena: 4500,
      sound: "/assets/sounds/zdrave.wav",
      owned: false
    },
    {
      title: "Síla",
      cena: 6422,
      sound: "/assets/sounds/sila.wav",
      owned: false

    },
    {
      title: "AAAAAAA",
      cena: 7000,
      sound: "/assets/sounds/AAAAAAA.wav",
      owned: false

    },
    {
      title: "Husté",
      cena: 8500,
      sound: "/assets/sounds/huste.wav",
      owned: false

    },
    {
      title: "MMA",
      cena: 13000,
      sound: "/assets/sounds/mma.wav",
      owned: false

    },
    {
      title: "Plecháč",
      cena: 50000,
      sound: "/assets/sounds/plechac.wav",
      owned: false

    },
    {
      title: "Picus123",
      cena: 100000,
      sound: "/assets/sounds/Picus123.wav",
      owned: false
    },
  ]
}
