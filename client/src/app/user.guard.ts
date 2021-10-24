import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCheck } from './api';
declare interface ApiUserCeck {
  loginedin: boolean;
  username: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(protected router: Router, protected http: HttpClient) {}
  Access(): ApiUserCeck | null {
    var dataReturn: ApiUserCeck | null = null;
    this.http.get<any>(UserCheck).subscribe((data: ApiUserCeck) => {
      if (data.loginedin) {
        dataReturn = data;
      }
    });
    return dataReturn;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.Access()) {
      this.router.navigate(['/user']);
      return false;
    }
    return true;
  }
}
