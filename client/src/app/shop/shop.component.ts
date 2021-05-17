import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



  static Buy(e: any) {
    if (JonanekComponent.count > e.cena) {
      JonanekComponent.count -= e.cena
      ShopComponent.BuySound();
      //JonanekComponent.Set();
    }

    else {
      //Error  
    }
  }
  static BuySound(): void{
    const audio = new Audio("assets/sounds/coinsound.wav")
    audio.volume = 0.2
    audio.play();
  }
}
