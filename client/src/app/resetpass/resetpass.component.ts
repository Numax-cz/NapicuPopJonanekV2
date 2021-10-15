import { Component, OnInit } from '@angular/core';
declare interface ApiData {
  email: string;
}
@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss'],
})
export class ResetpassComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public onSubmit(data: ApiData): void {}
}
