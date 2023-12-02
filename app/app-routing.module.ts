import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeBibliotecaComponent } from "./components/home-biblioteca/home-biblioteca.component";
import { AddJogoComponent } from "./components/add-jogo/add-jogo.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ExcluirContaComponent } from "./components/excluir-conta/excluir-conta.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { QuemSomosComponent } from "./components/quem-somos/quem-somos.component";
import { EditJogoComponent } from "./components/edit-jogo/edit-jogo.component";
import { authGuard } from "./guards/auth.guard";
import { roleGuard } from "./guards/role.guard";
import { LoginAdmComponent } from "./components/login-adm/login-adm.component";
import { AdministracaoComponent } from "./components/administracao/administracao.component";
import { AdmUsuariosComponent } from "./components/adm-usuarios/adm-usuarios.component";
import { AdmJogosComponent } from "./components/adm-jogos/adm-jogos.component";

const routes: Routes = [

    {path: '', component: QuemSomosComponent},

    {path: 'login', component: LoginComponent},

    {path: 'registro', component: RegistroComponent},

    {path: 'login-adm', component: LoginAdmComponent},

    {path: 'administracao', component: AdministracaoComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'adm-usuarios', component: AdmUsuariosComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'adm-jogos', component: AdmJogosComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'home-biblioteca', component: HomeBibliotecaComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'add-jogo', component: AddJogoComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'editar-jogo/:id', component: EditJogoComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},

    {path: 'settings', component: SettingsComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}},
    
    {path: 'excluir-conta', component: ExcluirContaComponent, canActivate:[authGuard, roleGuard], data: {role: 'ADMIN'}}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}