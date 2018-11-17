import { Sala } from './../sala';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { EventEmitter } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
    selector: 'app-sala-modal',
    templateUrl: './sala-modal.component.html',
    styleUrls: ['./sala-modal.component.scss']
})
export class SalaModalComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public sala = new Sala;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) {}

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.sala = e;
        } else {
            const x = new Date();
            this.sala.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`rooms/`).set(`${this.sala.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.sala = new Sala;
        });
    }


}
