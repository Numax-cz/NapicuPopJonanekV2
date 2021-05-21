import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JonanekComponent } from '../jonanek/jonanek.component';

@Component({
  selector: 'app-settings-alert-session',
  templateUrl: './settings-alert-session.component.html',
  styleUrls: ['./settings-alert-session.component.scss']
})
export class SettingsAlertSessionComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  clear(): void{
    window.localStorage.clear();
    JonanekComponent.Load();
    this.router.navigate(["/shop/settings"]);
  }
  noclear(): void {
    this.router.navigate(["/shop/settings"]);
  }
}
