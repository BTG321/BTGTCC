import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeBibliotecaComponent } from './components/home-biblioteca/home-biblioteca.component';
import { AddJogoComponent } from './components/add-jogo/add-jogo.component';
import { ExcluirContaComponent } from './components/excluir-conta/excluir-conta.component';
import { QuemSomosComponent } from './components/quem-somos/quem-somos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditJogoComponent } from './components/edit-jogo/edit-jogo.component';
import { LoginAdmComponent } from './components/login-adm/login-adm.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { AdmUsuariosComponent } from './components/adm-usuarios/adm-usuarios.component';
import { AdmJogosComponent } from './components/adm-jogos/adm-jogos.component';
import { SearchPipe } from './pipes/search.pipe';
import { InfoJogoComponent } from './components/info-jogo/info-jogo.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    LoginComponent,
    RegistroComponent,
    HomeBibliotecaComponent,
    AddJogoComponent,
    ExcluirContaComponent,
    QuemSomosComponent,
    EditJogoComponent,
    LoginAdmComponent,
    AdministracaoComponent,
    AdmUsuariosComponent,
    AdmJogosComponent,
    SearchPipe,
    InfoJogoComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    CommonModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule, 
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
