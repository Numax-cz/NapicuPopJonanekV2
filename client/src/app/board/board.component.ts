import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public usersBoard: any[] = [
    {
      user: 'Mařka',
      count: 43545,
    },
    {
      user: 'Blažka',
      count: 654,
    },
    {
      user: 'Konař',
      count: 345345,
    },
    {
      user: 'Jana',
      count: 123123,
    },
    {
      user: 'Maru',
      count: 4324,
    },
    {
      user: 'Terka',
      count: 456,
    },
    {
      user: 'Jan',
      count: 43426567564,
    },
    {
      user: 'Bořek',
      count: 5432,
    },
    {
      user: 'Stanislav',
      count: 123,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
