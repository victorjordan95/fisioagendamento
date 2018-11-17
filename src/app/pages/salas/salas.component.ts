import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaModalComponent } from './sala-modal/sala-modal.component';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth],
})
export class SalasComponent implements OnInit {
    @ViewChild(SalaModalComponent) modalComponent: SalaModalComponent;
    public rooms;
    public isLoaded = true;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getRooms();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    getRooms() {
        this.isLoaded = false;
        this.angularFire.list(`rooms`).valueChanges().subscribe(
            data => {
                this.rooms = data;
                this.isLoaded = true;
            }
        );
    }

}
