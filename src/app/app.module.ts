import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxMaskModule} from 'ngx-mask';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {NgSelectizeModule} from 'ng-selectize';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchComponent } from './layout/header/search/search.component';
import { NavigationTriggerComponent } from './layout/header/navigation-trigger/navigation-trigger.component';
import { LoginComponent } from './pages/login/login.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CriarEventoComponent } from './pages/agendamento/criar-evento/criar-evento.component';
import { ToastrModule } from 'ngx-toastr';
import { SalaModalComponent } from './pages/salas/sala-modal/sala-modal.component';
import { SalasComponent } from './pages/salas/salas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ModalUsuariosComponent } from './pages/usuarios/modal-usuarios/modal-usuarios.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { ModalMedicosComponent } from './pages/medicos/modal-medicos/modal-medicos.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ModalPacientesComponent } from './pages/pacientes/modal-pacientes/modal-pacientes.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { ModalPacienteComponent } from './pages/paciente/modal-paciente/modal-paciente.component';
import { LoaderComponent } from './layout/loader/loader.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SearchComponent,
    NavigationTriggerComponent,
    LoginComponent,
    AgendamentoComponent,
    CalendarComponent,
    CriarEventoComponent,
    SalasComponent,
    SalaModalComponent,
    UsuariosComponent,
    ModalUsuariosComponent,
    MedicosComponent,
    ModalMedicosComponent,
    PacientesComponent,
    ModalPacientesComponent,
    PacienteComponent,
    ModalPacienteComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxMaskModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true,
      closeButton: true
    }),
    NgSelectizeModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
