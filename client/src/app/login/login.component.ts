import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';

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

  public declare static UserData: any;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void { }
  


  public onSubmit(data: any): void {
    console.log(data);
    
  }
}
