import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { SalasComponent } from './pages/salas/salas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacienteComponent } from './pages/paciente/paciente.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'salas', component: SalasComponent},
  { path: 'medicos', component: MedicosComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'pacientes', component: PacientesComponent},
  { path: 'paciente/:id', component: PacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
