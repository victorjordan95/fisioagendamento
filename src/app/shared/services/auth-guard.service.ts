import { AngularFireAuth } from 'angularfire2/auth';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public router: Router, private afAuth: AngularFireAuth) { }

    canActivate(): boolean {
        const _user = localStorage.getItem('usuario');
        if (!_user && this.checkUser()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;

    }

    checkUser(): boolean {
        this.afAuth.authState.subscribe(user => {
            if (!user) {
                return false;
            }
            return true;
        });
        return;
    }
}
