import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-shop-sound',
  templateUrl: './shop-sound.component.html',
  styleUrls: ['./shop-sound.component.scss']
})
export class ShopSoundComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
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
      title: "Vole",
      cena: 1000,
      sound: "/assets/sounds/vole.wav"
    },
    {
      title: "Nemam",
      cena: 2000,
      sound: "/assets/sounds/nema.wav"

    },
    {
      title: "Zdrave",
      cena: 4500,
      sound: "/assets/sounds/zdrave.wav"
    },
    {
      title: "Síla",
      cena: 6422,
      sound: "/assets/sounds/sila.wav"

    },
    {
      title: "AAAAAAA",
      cena: 7000,
      sound: "/assets/sounds/AAAAAAA.wav"

    },
    {
      title: "Husté",
      cena: 8500,
      sound: "/assets/sounds/huste.wav"

    },
    {
      title: "MMA",
      cena: 13000,
      sound: "/assets/sounds/mma.wav"

    },
    {
      title: "Plecháč",
      cena: 50000,
      sound: "/assets/sounds/plechac.wav"

    },
    {
      title: "Picus123",
      cena: 100000,
      sound: "/assets/sounds/Picus123.wav"
    },
  ]
}
