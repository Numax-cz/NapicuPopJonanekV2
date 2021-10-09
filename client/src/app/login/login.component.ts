import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

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
  protected readonly slowInputTime: number = 1000;
  @ViewChild('Name') protected declare Name: any;
  @ViewChild('Email') protected declare Email: any;
  @ViewChild('Pass1') protected declare Pass1: any;
  @ViewChild('Pass2') protected declare Pass2: any;
  protected timeout: any;
  public errorText: string[] | null = null;

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(29),
      this.usernameValidator(),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),

    passwords: new FormGroup(
      {
        pass1: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          this.passwordHasLower(),
          this.passwordHasNumber(),
          this.passwordHasUpper(),
        ]),
        pass2: new FormControl('', []),
      },
      { validators: this.checkIfMatchingPasswords('pass1', 'pass2') }
    ),
  });

  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  public checkUsernameAvailable() {
    this.slowInput(() => {
      if (this.registerForm.get('name')?.valid) {
        // this.http
        //   .post<any>(UserNameCheck, this.getValue(this.Name))
        //   .subscribe((data: ApiLoginRegisterR) => {
        //     if (data.code == 0) {
        //       //todo
        //     } else {
        //       this.setBackground(this.Name);
        //     }
        //   });
      }
    });
  }

  public checkEmail(): void {
    this.slowInput(() => {
      if (this.registerForm.get('email')?.valid) {
        //todo
      }
    });
  }
  public checkPassword(): void {
    console.log(this.registerForm.get('passwords')?.get('pass1')?.errors);
  }

  protected slowInput(func: Function) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      func();
    }, this.slowInputTime);
  }

  protected getValue(value: any): string {
    return value.nativeElement.value;
  }

  public onSubmit(data: ApiData): void {
    if (!data) return;
    // this.http.post<any>(UserRegister, data).subscribe((data: ApiLoginRegisterR) => {
    //   if (data.code == 0) {
    //   } else {
    //     //TODO SUS
    //   }
    // });
  }

  protected passwordHasNumber(): ValidatorFn {
    return (i: AbstractControl): ValidationErrors | null => {
      const value = i.value;

      if (!value) return null;

      const hasNum = /[0-9]+/.test(value);

      return !hasNum ? { passwordhasNoNum: !hasNum } : null;
    };
  }
  protected passwordHasLower(): ValidatorFn {
    return (i: AbstractControl): ValidationErrors | null => {
      const value = i.value;

      if (!value) return null;

      const hasLower = /[a-z]+/.test(value);

      return !hasLower ? { passwordhasNoLower: !hasLower } : null;
    };
  }
  protected passwordHasUpper(): ValidatorFn {
    return (i: AbstractControl): ValidationErrors | null => {
      const value = i.value;

      if (!value) return null;

      const hasUpper = /[A-Z]+/.test(value);

      return !hasUpper ? { passwordhasNoUpper: !hasUpper } : null;
    };
  }
  protected usernameValidator(): ValidatorFn {
    return (i: AbstractControl): ValidationErrors | null => {
      const value = i.value;

      if (!value) return null;

      const hasLowK = /^[a-zA-Z0-9\-]+$/.test(value);

      return !hasLowK ? { hasBadCharacters: !hasLowK } : null;
    };
  }

  /**
   * @author RemyaJ
   * @link https://stackoverflow.com/questions/43487413/password-and-confirm-password-field-validation-angular2-reactive-forms
   * @param {string} passwordKey - Main password
   * @param  {string} passwordConfirmationKey - authentication password
   * @returns {ValidationErrors} ValidationErrors
   */
  protected checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): any {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  get email() {
    return this.registerForm.get('email');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get pass1() {
    var i = this.registerForm.get('passwords');
    if (!i) return null;
    return i.get('pass1');
  }
  get pass2() {
    var i = this.registerForm.get('passwords');
    if (!i) return null;
    return i.get('pass2');
  }
}
