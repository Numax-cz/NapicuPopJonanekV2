import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResetPassCheck } from '../api';
import { ApiLoginRegisterR } from '../register/register.component';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  constructor(protected Aroute: ActivatedRoute, protected router: Router, protected http: HttpClient) {
    var code = this.Aroute.snapshot.params['code'];
    if (!code) return;
    this.http.post<any>(UserResetPassCheck, code).subscribe((data: ApiLoginRegisterR) => {
      if (data.code !== 0) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
