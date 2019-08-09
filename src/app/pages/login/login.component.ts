import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AngularFireAuth, AngularFireDatabase],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth, private router: Router, private angularFire: AngularFireDatabase, private toastr: ToastrService) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        if (!f.valid) {
            this.toastr.error('Falha ao realizar login', 'Erro!');
            return;
        }
        this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.senha.value)
            .then((data: any) => {
                this.angularFire.list(`usuarios/${data.user.uid}`).valueChanges().subscribe(
                    (data: any) => {
                        localStorage.setItem('usuario', btoa(data));
                        this.toastr.success(`Seja bem-vindo ao sistema, ${data[2]}`, 'Bem-vindo!');
                        this.router.navigate(['/agendamento'])
                    }
                );
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
                    this.toastr.error('Usuário ou senha inválidos', 'Erro ao acessar!');
                } else if (error.code === 'auth/user-not-found') {
                    this.toastr.error('E-mail inválido', 'Erro ao acessar!');
                } else {
                    this.toastr.error('Ocorreu um erro ao acessar a aplicação', 'Erro ao acessar!');
                }
            });

        f.controls.email.setValue('');
        f.controls.senha.setValue('');
    }

}
