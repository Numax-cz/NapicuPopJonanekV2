import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiLoginRegisterR } from '../register/register.component';
declare interface ApiData {
  in: string,
  heslo: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  public onSubmit(data: ApiData): void {
    // if (!data) return;
    // this.http.post<any>(UserRegister, data).subscribe((data: ApiLoginRegisterR) => {
    //   if (data.code == 0) {
    //   } else {
    //     //TODO SUS
    //   }
    // });
  }
}
