import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalBoard } from '../api';

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
  public usersBoard: ApiData[] = this.getBoardData();
  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  private getBoardData(): ApiData[] {
    var dataReturn = [];
    this.http.get<any>(GlobalBoard).subscribe((data: ApiData[]) => {
      dataReturn = data;
    });
    return [];
  }
}
