import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AuthService } from 'src/app/services/auth.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-biblioteca',
  templateUrl: './home-biblioteca.component.html',
  styleUrls: ['./home-biblioteca.component.css']
})
export class HomeBibliotecaComponent implements OnInit {
  userId: number;
  username: string | null;

  allJogos: Jogo[] = []
  jogos: Jogo[] = []
  mostrarPopUp: boolean = false;
  jogoSelecionado: Jogo;

  faPencil = faPencil;
  faTrash = faTrashCan;

  quant_games: number = 0;

  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.atualizarContador();
    setInterval(() => this.atualizarContador(), 1000);

    this.obterJogosDaEmpresa();

     const token = localStorage.getItem('token');

     if (token) {
      try {
        // Decodificar o token (assumindo que é um token JWT)
        const tokenData = JSON.parse(atob(token.split('.')[1]));

        // Verificar se o token contém a propriedade "IdEmpresa"
        if (tokenData && tokenData.IdEmpresa && tokenData.unique_name) {
          // Extrair o ID do usuário do token
          this.userId = tokenData.IdEmpresa;
          this.username = tokenData.unique_name;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
}

obterJogosDaEmpresa() {
  this.empresaService.obterJogosDaEmpresaLogada().subscribe(
    (data: any) => {
      this.jogos = data;
      console.log('Jogos da empresa:', this.jogos);
      // Faça o que quiser com os dados recebidos
    },
    (error) => {
      console.error('Erro ao obter jogos da empresa:', error);
    }
  );
}

  mostrarDetalhes(jogo: Jogo) {
    this.jogoSelecionado = jogo;
    this.mostrarPopUp = true;
  }

  fecharPopUp() {
    this.jogoSelecionado = null;
    this.mostrarPopUp = false;
  }

  contarDivs(className: string): number {
    const divs = document.querySelectorAll(`.${className}`);
    return divs.length;
  }

  atualizarContador() {
    this.quant_games = this.contarDivs('card');
  }

  logout() {
    this.authService.logout();
    this.username = null;
  }
}
