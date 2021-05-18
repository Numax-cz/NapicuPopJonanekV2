import { Component, OnInit } from '@angular/core';
import { JonanekComponent } from '../jonanek/jonanek.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {















  constructor() { }

  ngOnInit(): void { }


  setVolumeJonanek(e: any): void {

    JonanekComponent.volume = (e / 100);
    JonanekComponent.LoadSound();
  }

  setVolumeSt(e: any): void {

    

  }


  get VolumeJonanek(): number {
    return JonanekComponent.volume * 100
  }
  get VolumeSt(): number{
    return 100;
  }

}
