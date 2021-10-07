import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';

declare interface ApiData {
  username: string;
  email: string;
  heslo: string;
  reheslo: string;
}
declare interface ApiLoginRegisterR {
  code: number;
  msg: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('Name') public declare Name: any;
  @ViewChild('Email') public declare Email: any;
  @ViewChild('Pass1') public declare Pass1: any;
  @ViewChild('Pass2') public declare Pass2: any;





  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
   
  }

  public checkUserName(): void {
    this.http
      .post<any>('/api/usernamecheck', this.getValue(this.Name))
      .subscribe((data: ApiLoginRegisterR) => {
        if (data.code == 0) {
          this.unsetBackground(this.Name);
        } else {
          this.setBackground(this.Name);
        }
      });
  }

  protected setBackground(element: any): void {
    element.nativeElement.style.background = 'rgb(235, 47, 6)';
  }
  protected unsetBackground(element: any): void {
    element.nativeElement.style.background = null;
  }

  protected getValue(value: any): string {
    return value.nativeElement.value;
  }

  public onSubmit(data: ApiData): void {
    if (!data) return;
    this.http.post<any>('/api/reg', data).subscribe((data: ApiLoginRegisterR) => {
      if (data.code == 0) {
      } else {
      }
    });
  }
}
