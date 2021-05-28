import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {



  public static OwnedSounds: string;
  public static OwnedBackground: string;
  public static readonly Volume: number = 0.2;

  constructor() { }

  ngOnInit(): void {
    JonanekComponent.Load();
   }


  public static Load(): void {
    this.OwnedSounds = window.localStorage.getItem("Sounds") || '["Smích"]';
    this.OwnedBackground = window.localStorage.getItem("Backgrounds") || '[JonánekSmích]';
  }


  public static BuySound(e: any) {
    if (JonanekComponent.count >= e.cena) {
      JonanekComponent.count -= e.cena;
      var array = JSON.parse(this.OwnedSounds);
      array.push(e.title)
      localStorage.setItem("Sounds", JSON.stringify(array));
      this.OwnedSounds = JSON.stringify(array)
      ShopComponent.PlayBuySound();
      JonanekComponent.Set();
    }
  }

  public static PlayBuySound(): void {
    const audio = new Audio("assets/sounds/Other/coinsound.wav")
    audio.volume = this.Volume;
    audio.play();
  }

  public static PlayErrorSound(): void {
    const audio = new Audio("assets/sounds/Other/errorclick.wav");
    audio.volume = this.Volume;
    audio.play();
  }
  public static PlaySelectSound(): void {
    const audio = new Audio("assets/sounds/Other/select.wav");
    audio.volume = this.Volume;
    audio.play();
  }
}
