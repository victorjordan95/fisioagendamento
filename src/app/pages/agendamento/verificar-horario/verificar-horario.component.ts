import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verificar-horario',
  templateUrl: './verificar-horario.component.html',
  styleUrls: ['./verificar-horario.component.scss']
})
export class VerificarHorarioComponent implements OnInit {
  @ViewChild('createModal') createModal: ModalDirective;

  @Output() checkSchedule = new EventEmitter();
  @Output() checkAvailableDate = new EventEmitter();
  
  @Input() events: any;

  public isFiltering = true;

  private SCHEDULE_LIST = [
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
  ];
  public currentCheckingDate = new Date();
  public availableHour = [];
  public newVar: any;

  constructor() { }

  ngOnInit() {
  }

  showModal(): void {
    this.createModal.show();
    this.getWeekSchedules().then(res => {
      this.getAvailableDays(res);
    });
  }

  public checkNewDate (e) {
    this.currentCheckingDate = e;
    this.checkAvailableDate.emit(e);
    this.getWeekSchedules().then(res => {
      this.getAvailableDays(res);
    });
  }

  public isToday(someDate: Date) {
    const today = this.currentCheckingDate;
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  }


  private async getWeekSchedules () {
    this.isFiltering = true;
    const weekSchedules = this.events.filter((schedule: any) => this.isToday(new Date(schedule.start)));
    await Promise.resolve(weekSchedules);
    this.isFiltering = false;
    return weekSchedules.map((schedule: any) => schedule.startHour);
  }

  getAvailableDays(schedules: any) {
    this.availableHour = this.SCHEDULE_LIST.filter((hour) => !schedules.includes(hour));
  }

  sendClickedDay(available: string) {
    this.checkSchedule.emit(available);
    this.dismissModal();
  }

  dismissModal() {
    this.createModal.hide();
  }

}
