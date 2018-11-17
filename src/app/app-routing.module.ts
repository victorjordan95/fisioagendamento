import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { SalasComponent } from './pages/salas/salas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'salas', component: SalasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }