import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Empresa } from 'src/app/Empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Empresa>();

  registroForm!: FormGroup

  campo_cpf: boolean = true; // Inicialmente, o campo CPF está visível
  campo_cnpj: boolean = false; // Inicialmente, o campo CNPJ está oculto

  constructor(
    private empresaService: EmpresaService, 
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numero_de_contato: ['', Validators.required],
      cpf: [''],
      cnpj: [''],
    });
  }

  ngOnInit(): void {}

  changeIdent(identifier: string): void {
    if (identifier === 'cpf') {
      this.campo_cpf = true;
      this.campo_cnpj = false;
      this.registroForm.get('cpf').enable();
      this.registroForm.get('cnpj').disable();
    } else {
      this.campo_cpf = false;
      this.campo_cnpj = true;
      this.registroForm.get('cpf').disable();
      this.registroForm.get('cnpj').enable();
    }
  }

  onSpaceKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.keyCode === 32) {
      event.preventDefault();
    }
  }
  
  submitForm() {
    if (this.registroForm.valid) {
      const registroData = this.registroForm.value;
  
      // Faça a solicitação HTTP POST para a API de registro
      this.http.post('https://localhost:7043/api/Empresa', registroData).subscribe(
        (response) => {
          console.log('Registro bem-sucedido', response);
          alert('Cadastro efetuado com sucesso!');
          this.router.navigate(['/login']);
        },
        (error) => {
          // Lide com erros, como exibir mensagens de erro para o usuário
          console.error('Erro no registro', error);
          alert('Ocorreu um erro!');
        }
      );
    }
  }

}
