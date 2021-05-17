import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-shop-sound',
  templateUrl: './shop-sound.component.html',
  styleUrls: ['./shop-sound.component.scss']
})
export class ShopSoundComponent implements OnInit {

  constructor() {

    JSON.parse(ShopComponent.OwnedSounds).forEach((e: string) => {


    });


  }

  ngOnInit(): void {
    console.log(this.items);




  }

  Play(e: any): void {
    console.log(e.sound);
    var sound = new Audio(e.sound);
    sound.play();
  }
  img: string = "assets/sound.png";
  btn: boolean = true;


  Buy(i: any): void {
    ShopComponent.Buy(i);
  }


  items = [
    {
      title: "Smích",
      cena: "",
      sound: "/assets/sounds/vole.wav",
      owned: true
    },
    {
      title: "Vole",
      cena: 1000,
      sound: "/assets/sounds/vole.wav",
      owned: true
    },
    {
      title: "Nemam",
      cena: 2000,
      sound: "/assets/sounds/nema.wav",
      owned: true

    },
    {
      title: "Zdrave",
      cena: 4500,
      sound: "/assets/sounds/zdrave.wav",
      owned: true
    },
    {
      title: "Síla",
      cena: 6422,
      sound: "/assets/sounds/sila.wav",
      owned: true

    },
    {
      title: "AAAAAAA",
      cena: 7000,
      sound: "/assets/sounds/AAAAAAA.wav",
      owned: true

    },
    {
      title: "Husté",
      cena: 8500,
      sound: "/assets/sounds/huste.wav",
      owned: true

    },
    {
      title: "MMA",
      cena: 13000,
      sound: "/assets/sounds/mma.wav",
      owned: true

    },
    {
      title: "Plecháč",
      cena: 50000,
      sound: "/assets/sounds/plechac.wav",
      owned: true

    },
    {
      title: "Picus123",
      cena: 100000,
      sound: "/assets/sounds/Picus123.wav",
      owned: true
    },
  ]
}
