import { ModalConsultoriosComponent } from './modal-consultorios/modal-consultorios.component';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.scss'],
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class ConsultoriosComponent implements OnInit {

  @ViewChild(ModalConsultoriosComponent) modalComponent: ModalConsultoriosComponent;
    public consultorios;
    public isLoaded = true;
    public filter = '';
    public page = 1;
    public key = 'nome';
    public reverse = false;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getConsultorios();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    getConsultorios() {
        this.isLoaded = false;
        this.angularFire.list(`consultorios`).valueChanges().subscribe(
            data => {
                this.consultorios = data;
                this.isLoaded = true;
            }
        );
    }

    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
