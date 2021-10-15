import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserResetPass } from '../api';
import { ApiLoginRegisterR } from '../register/register.component';
declare interface ApiData {
  email: string;
}
@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss'],
})
export class ResetpassComponent implements OnInit {
  public declare formS: boolean;
  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}
  public onSubmit(data: ApiData): void {
    this.http.post<any>(UserResetPass, data).subscribe((data: ApiLoginRegisterR) => {
      if (data.code == 0) {
        this.formS = true;
      }
    });
  }
}
