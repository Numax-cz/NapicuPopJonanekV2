import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  static forEach(arg0: (e: any) => void) {
    throw new Error('Method not implemented.');
  }



  public static OwnedSounds: string = window.localStorage.getItem("Sounds") || '["Smích"]';

  constructor() {










  }

  ngOnInit(): void {





  }



  static Buy(e: any) {
    if (JonanekComponent.count >= e.cena) {
      JonanekComponent.count -= e.cena;
      var array = JSON.parse(this.OwnedSounds);
      array.push(e.title)
      localStorage.setItem("Sounds", JSON.stringify(array));
      this.OwnedSounds = JSON.stringify(array)
      ShopComponent.BuySound();

      JonanekComponent.Set();
    }

    else {
      //Error  
    }
  }
  static BuySound(): void {
    const audio = new Audio("assets/sounds/coinsound.wav")
    audio.volume = 0.2
    audio.play();
  }
}
