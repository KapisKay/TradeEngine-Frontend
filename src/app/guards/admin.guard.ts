import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private alert: AlertService,
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean 
    | UrlTree {
      const role = localStorage.getItem('role');

      if(role == 'admin'){
        return true;
      }
      else{
        this.router.navigateByUrl('/admin/dashboard');
        this.alert.error('You are not authorised to access this page');
        return false;
      }
  }
  
}
