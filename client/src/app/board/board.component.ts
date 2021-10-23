import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare interface ApiData {
  user: string;
  count: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public usersBoard: ApiData[] = [];
  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  private getBoardData(): ApiData[] {
    var dataReturn = [];
    this.http.get<any>('https://api.npms.io/v2/search?q=scope:angular').subscribe((data) => {
      dataReturn = data;
    });
    return [];
  }
}
