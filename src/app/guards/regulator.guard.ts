import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RegulatorGuard implements CanActivate {

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

      if(role == 'regulator'){
        return true;
      }
      else{
        this.router.navigateByUrl('/regulator/dashboard');
        this.alert.error('You are not authorised to access this page');
        return false;
      }
  }
  
}
