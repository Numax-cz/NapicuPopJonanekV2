import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFocusInput]',
})
export class FocusInputDirective {
  @Input() declare appFocusInput: AbstractControl | null;
  constructor() {}

  @HostListener('focus', ['$event']) onFocus(e: any) {
    this.appFocusInput?.markAsTouched();
  }
  @HostListener('blur', ['$event']) onblur(e: any) {
    this.appFocusInput?.markAsUntouched();
  }
}
