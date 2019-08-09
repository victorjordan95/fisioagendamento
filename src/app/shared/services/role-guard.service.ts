import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthGuardService, public router: Router, private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    // decode the token to get its payload
    const user = atob(localStorage.getItem('usuario')).split(',');

    if (!this.auth.canActivate() || !expectedRole.includes(user[3])) {
      this.toastr.error(`Verifique se você realmente possui autorização para acessar esta funcionalidade`, 'Acesso negado!');
      return false;
    }
    return true;
  }
}
