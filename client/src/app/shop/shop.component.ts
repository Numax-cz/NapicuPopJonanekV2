import {Component, OnDestroy, OnInit} from '@angular/core';
import {JonanekComponent} from '../jonanek/jonanek.component';

import {ArrayListImg} from '../shop-background/shop-background.component';
import {ArrayListSound} from '../shop-sound/shop-sound.component';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {



  public static OwnedSounds: string;
  public static OwnedBackground: string;
  public static readonly Volume: number = 0.2;

  constructor() { }

  ngOnInit(): void {
    JonanekComponent.IsMenuOpen = true;
    JonanekComponent.Load();
  }
  ngOnDestroy(): void {
    JonanekComponent.IsMenuOpen = false;
  }


  public static Load(): void {
    this.OwnedSounds = window.localStorage.getItem("Sounds") || '["Smích"]';
    this.OwnedBackground = window.localStorage.getItem("Backgrounds") || '["Smích"]';
  }

  public static BuySound(e: ArrayListSound) {
    if (this.Price(e)) {
      var array = JSON.parse(this.OwnedSounds);
      array.push(e.title);
      localStorage.setItem("Sounds", JSON.stringify(array));
      this.OwnedSounds = JSON.stringify(array)
    }
  }

  public static BuyBackground(e: ArrayListImg) {
    if (this.Price(e)) {
      var array = JSON.parse(this.OwnedBackground);
      array.push(e.title);
      localStorage.setItem("Backgrounds", JSON.stringify(array));
      this.OwnedBackground = JSON.stringify(array);
    }
  }

  public static Price(e: ArrayListImg | ArrayListSound): boolean {
    if (JonanekComponent.count >= e.cena && typeof e.cena === "number") {
      JonanekComponent.count -= e.cena;
      ShopComponent.PlayBuySound();
      JonanekComponent.SetCounter();
      return true;
    }
    return false;
  }


  public static PlayBuySound(): void {
    if (JonanekComponent.CheckBeforePlaySn()) {
      const audio = new Audio("assets/sounds/Other/coinsound.wav")
      audio.volume = this.Volume;
      audio.play();
    }
  }

  public static PlayErrorSound(): void {
    if (JonanekComponent.CheckBeforePlaySn()) {
      const audio = new Audio("assets/sounds/Other/errorclick.wav");
      audio.volume = this.Volume;
      audio.play();
    }
  }
  public static PlaySelectSound(): void {
    if (JonanekComponent.CheckBeforePlaySn()) {
      const audio = new Audio("assets/sounds/Other/select.wav");
      audio.volume = this.Volume;
      audio.play();
    }
  }
}
