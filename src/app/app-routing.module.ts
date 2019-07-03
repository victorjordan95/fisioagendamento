import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { SalasComponent } from './pages/salas/salas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ConsultoriosComponent } from './pages/consultorios/consultorios.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'salas', component: SalasComponent},
  { path: 'consultorios', component: ConsultoriosComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'pacientes', component: PacientesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
