import { ModalConsultoriosComponent } from './modal-consultorios/modal-consultorios.component';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Consultorio } from './Consultorio';


@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.scss'],
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class ConsultoriosComponent implements OnInit {

  @ViewChild(ModalConsultoriosComponent) modalComponent: ModalConsultoriosComponent;
    public consultorios: Consultorio[];
    public isLoaded: boolean;
    public filter = '';
    public page = 1;
    public key = 'nome';
    public reverse = false;

    constructor(private angularFire: AngularFireDatabase) {
        this.isLoaded = false;
    }

    ngOnInit() {
        this.getConsultorios();
    }

    showModal(conultorio?: Consultorio) {
        this.modalComponent.showModal(conultorio);
    }

    getConsultorios() {
        this.isLoaded = false;
        this.angularFire.list(`consultorios`).valueChanges().subscribe(
            (consultorios: Consultorio[]) => {
                this.consultorios = consultorios;
                this.isLoaded = true;
            }
        );
    }

    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
