import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-jogo',
  templateUrl: './add-jogo.component.html',
  styleUrls: ['./add-jogo.component.css']
})
export class AddJogoComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Jogo>();

  btnText = 'Enviar';

  userId: number;
  jogoId: number;

  jogoForm!: FormGroup

  faPencil = faPencil;
  faCancel = faTimes;
  
  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.jogoForm = this.fb.group({
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      nome: ['', Validators.required],
      classificacao: ['', Validators.required],
      empresa_id: [''],
      empresa: [null]
    })
}

ngOnInit(): void {
  const token = localStorage.getItem('token');
     if (token) {
      try {
        // Decodificar o token (assumindo que é um token JWT)
        const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Verificar se o token contém a propriedade "IdEmpresa"
        if (tokenData && tokenData.IdEmpresa) {
          // Extrair o ID do usuário do token
          this.userId = tokenData.IdEmpresa;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
}

submitForm() {
  if (this.jogoForm.valid) {
    const jogoData = this.jogoForm.value;

    this.jogosService.createJogo(jogoData).subscribe(
      (response) => {
        console.log('Jogo cadastrado com sucesso!', response);
        alert('Jogo cadastrado com sucesso!');
        this.router.navigate(['/home-biblioteca']);
      },
      (error) => {
        console.error('Erro no registro', error);
        alert('Ocorreu um erro!');
      }
    );
  } else {
    console.log("teste", this.jogoForm);
  }
}

logout() {
  this.authService.logout();
}
} 