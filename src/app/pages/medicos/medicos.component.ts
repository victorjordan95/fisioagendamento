import { ModalMedicosComponent } from './modal-medicos/modal-medicos.component';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from './Medico';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class MedicosComponent implements OnInit {

  @ViewChild(ModalMedicosComponent) modalComponent: ModalMedicosComponent;
    public medicos: Medico[];
    public isLoaded: boolean;
    public filter = '';
    public page = 1;
    public key = 'nome';
    public reverse = false;

    constructor(private angularFire: AngularFireDatabase) {
        this.isLoaded = false;
    }

    ngOnInit() {
        this.getMedicos();
    }

    showModal(conultorio?: Medico) {
        this.modalComponent.showModal(conultorio);
    }

    getMedicos() {
        this.isLoaded = false;
        this.angularFire.list(`medicos`).valueChanges().subscribe(
            (medicos: Medico[]) => {
                this.medicos = medicos;
                this.isLoaded = true;
            }
        );
    }

    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
