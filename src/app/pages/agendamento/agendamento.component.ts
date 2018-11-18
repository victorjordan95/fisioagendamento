import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';

@Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class AgendamentoComponent implements OnInit {
    @ViewChild(CriarEventoComponent) modalComponent: CriarEventoComponent;

    public calendarIsLoaded = false;
    public userId;
    public rooms;
    public selectedRoom;
    public selectedRoomId;

    public user: String;
    public calendarOptions = {
        height: 'parent',
        fixedWeekCount: false,
        defaultDate: new Date(),
        editable: true,
        locale: 'pt-BR',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,list'
        },
        buttonText: {
            prev: 'Anterior',
            next: 'Próximo',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        eventLimit: true,
        events: [],
        eventClick: (event, jsEvent, view) => {
            const clickedEvent = this.calendarOptions.events.filter(element => element.id === event.id);
            this.showModal(clickedEvent);
        },
        dayClick: function(date, jsEvent, view) {
            alert('Clicked on: ' + date.format());
        },
        timeFormat: 'H(:mm)',
        eventOverlap: false,
        allDaySlot: false
    };

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
                this.getRooms();
            }
        });
    }

    showModal(event?) {
        this.modalComponent.showModal(this.selectedRoomId, event);
    }

    getEvents(id) {
        this.calendarIsLoaded = false;
        this.angularFire.list(`rooms/${id}/agenda`).valueChanges().subscribe(
            events => {
                let teste = [];
                teste = events;
                this.calendarOptions.events = teste;
                this.calendarIsLoaded = true;
            }
        );
    }

    getRooms() {
        this.angularFire.list(`rooms`).valueChanges().subscribe(
            data => {
                this.rooms = data;
                this.selectedRoom = this.rooms[0];
                this.selectedRoomId = this.selectedRoom.id;
                this.getEvents(this.selectedRoom.id);
            }
        );
    }

    updateSchedules(e) {
        this.toastr.success(`Evento "${e.title}" foi cadastrado com sucesso `, 'Sucesso!');
    }

    updateRoom(e) {
        this.selectedRoomId = e;
        this.getEvents(e);
    }

}
