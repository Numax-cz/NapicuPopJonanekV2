import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {



  public static OwnedSounds: string = window.localStorage.getItem("Sounds") || '["Smích"]';
  public static readonly Volume: number = 0.2;

  constructor() { }

  ngOnInit(): void {





  }



  public static Buy(e: any) {
    if (JonanekComponent.count >= e.cena) {
      JonanekComponent.count -= e.cena;
      var array = JSON.parse(this.OwnedSounds);
      array.push(e.title)
      localStorage.setItem("Sounds", JSON.stringify(array));
      this.OwnedSounds = JSON.stringify(array)
      ShopComponent.BuySound();
      JonanekComponent.Set();
    }
  }

  public static BuySound(): void {
    const audio = new Audio("assets/sounds/Other/coinsound.wav")
    audio.volume = this.Volume;
    audio.play();
  }

  public static ErrorSound(): void {
    const audio = new Audio("assets/sounds/Other/errorclick.wav");
    audio.volume = this.Volume;
    audio.play();
  }
  public static SelectSound(): void{
    const audio = new Audio("assets/sounds/Other/select.wav");
    audio.volume = this.Volume;
    audio.play();
  }
}
