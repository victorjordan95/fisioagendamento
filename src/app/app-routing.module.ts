import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { SalasComponent } from './pages/salas/salas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { RoleGuardService } from './shared/services/role-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [RoleGuardService], data: { expectedRole: ['FUNCIONARIO', 'ADMIN']}},
  { path: 'salas', component: SalasComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN']}},
  { path: 'medicos', component: MedicosComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN']}},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'pacientes', component: PacientesComponent, canActivate: [RoleGuardService], data: { expectedRole: ['FUNCIONARIO', 'ADMIN']}},
  { path: 'paciente/:id', component: PacienteComponent, canActivate: [RoleGuardService], data: { expectedRole: ['FUNCIONARIO', 'ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
