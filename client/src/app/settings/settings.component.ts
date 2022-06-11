import {Component, OnInit} from '@angular/core';
import {JonanekComponent} from '../jonanek/jonanek.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public Checked: boolean;


  constructor() {
    this.Checked = JonanekComponent.SoundsVoice;
  }

  ngOnInit(): void {

  }

  public Change(e: any): void {
    if (e.target.checked) {
      JonanekComponent.OnVoice();
    } else {
      JonanekComponent.OffVoice();
    }
  }










}
