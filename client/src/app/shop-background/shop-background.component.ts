import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';
import { ShopComponent } from '../shop/shop.component';


interface ArrayImg {
  img1: string,
  img2: string
}


export interface ArrayListImg {
  title: string,
  cena: string | number,
  imgs: ArrayImg[],
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
    this.items.forEach((e: ArrayListImg) => {
        JSON.parse(ShopComponent.OwnedBackground).forEach((i: string) => {
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
        if (e.imgs[0].img1 === JonanekComponent.background1 ) {
          this.SelectBackgroundRename(e);
        }
    });


  }


  get Background(): string { 
    return JonanekComponent.background1;
  }

  protected SelectBackground(i: ArrayListImg) {
    this.SelectBackgroundRename(i);
    var img1 = i.imgs[0].img1;
    var img2 = i.imgs[0].img2;
    JonanekComponent.background1 = img1;
    JonanekComponent.background2 = img2;
    var list = JSON.stringify([img1, img2]);

    window.localStorage.setItem("background", list);
    JonanekComponent.LoadBackground();
    ShopComponent.PlaySelectSound();

    this.Check();
  }

  protected SelectBackgroundRename(i: ArrayListImg) {
    i.cena = "Vybraný";
  }



  public BuyBackground(i: ArrayListImg): void {
    if (i.CBuy && !i.owned) {
      ShopComponent.PlayErrorSound();
    }
    JSON.parse(ShopComponent.OwnedBackground).forEach((e: string) => {
      if (e === i.title) {
        this.SelectBackground(i);
        return;
      }
    });
    ShopComponent.BuyBackground(i);
  }


  items: ArrayListImg[] = [
    {
      title: "JonánekSmích",
      cena: 0,
      imgs: [{ img1: "/assets/Jonanek1.webp", img2: "/assets/Jonanek2.webp" }],
      owned: false,
      CBuy: false
    },
    {
      title: "JonánekSmile",
      cena: 50,
      imgs: [{ img1: "/assets/JonanekSmile1.webp", img2: "/assets/JonanekSmile2.webp" }],
      owned: false,
      CBuy: false
    },

  ]
}
