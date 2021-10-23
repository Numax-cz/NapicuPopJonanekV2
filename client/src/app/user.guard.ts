import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
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
  constructor(protected http: HttpClient) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.http.get<any>(UserCheck).subscribe((data: ApiUserCeck) => {});

    return true;
  }
}
