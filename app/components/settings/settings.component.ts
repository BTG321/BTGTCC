import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/Empresa';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userId: number;
  empresa: Empresa;
  faPencil = faPencil;
  faTrash = faTrashCan;
  campo_cpf: boolean = true; // Inicialmente, o campo CPF está visível
  campo_cnpj: boolean = false; // Inicialmente, o campo CNPJ está oculto

  editForm!: FormGroup

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.formBuilder.group({
      nome: ['', Validators.required],
      senha: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numero_de_contato: ['', Validators.required],
      cpf: [''],
      cnpj: ['']
    });
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

    this.http.get(`https://localhost:7043/api/Empresa/${this.userId}`).subscribe(
      (data: any) => {
        this.empresa = data;
        console.log('Detalhes da Empresa:', this.empresa);
      },
      error => {
        console.error('Erro ao buscar detalhes da Empresa:', error);
      }
    );
  }

  changeIdent(identifier: string): void {
    if (identifier === 'cpf') {
      this.campo_cpf = true;
      this.campo_cnpj = false;
      this.editForm.get('cpf').enable();
      this.editForm.get('cnpj').disable();
    } else {
      this.campo_cpf = false;
      this.campo_cnpj = true;
      this.editForm.get('cpf').disable();
      this.editForm.get('cnpj').enable();
    }
  }

  onSpaceKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.keyCode === 32) {
      event.preventDefault();
    }
  }

  salvarEdicao() {
    if (this.editForm.valid) {
      const empresaData = this.editForm.value;
  
      this.empresaService.updateEmpresa(this.userId, empresaData).subscribe(
        (response) => {
          console.log('Empresa editada com sucesso!', response);
          alert('Empresa editada com sucesso!');
          this.authService.logout();
        },
        (error) => {
          console.error('Erro na edição', error);
          alert('Ocorreu um erro!');
        }
      );
    } else {
      console.log("teste", this.editForm);
    }
  }

  logout() {
    this.authService.logout();
  }

}
