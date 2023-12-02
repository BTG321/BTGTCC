import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AuthService } from 'src/app/services/auth.service';

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/Empresa';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.component.html',
  styleUrls: ['./excluir-conta.component.css']
})
export class ExcluirContaComponent implements OnInit {
  userId: number;
  empresa: Empresa;

  faPencil = faPencil;
  faTrash = faTrashCan;
  faCancel = faTimes;
  
  caixa: boolean = true;

  aviso: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private authService: AuthService,
  ) {}

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

  excluirConta() {
      // Chame o serviço de conta para excluir a conta
      this.empresaService.removeEmpresa(this.userId).subscribe(
        () => {
          // Caso de sucesso, faça logout
          this.authService.logout();
        },
        (error) => {
          console.error('Erro ao excluir a conta:', error);
          // Trate o erro conforme necessário
        }
      );
  }

  voltarInicio() {
    this.router.navigate(['/settings']);
  }

  abrirAviso(): void {
    this.caixa = false;
    this.aviso = true;
  }

  fecharAviso(): void {
    this.caixa = true;
    this.aviso = false;
  }

  logout() {
    this.authService.logout();
  }

}
