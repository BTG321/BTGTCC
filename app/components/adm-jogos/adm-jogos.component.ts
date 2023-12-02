import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JogosService } from 'src/app/services/jogos.service';
import { Jogo } from 'src/app/Jogo';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-adm-jogos',
  templateUrl: './adm-jogos.component.html',
  styleUrls: ['./adm-jogos.component.css']
})
export class AdmJogosComponent implements OnInit {
  jogos: Jogo[];
  jogo: Jogo;
  searchText: string = '';
  faTrash = faTrashCan;
  faSearch = faSearch;

  constructor(
    private router: Router,
    private jogosService: JogosService,
  ) {}

  ngOnInit(): void {
    this.jogosService.getJogos().subscribe(data => {
      this.jogos = data;
    });
  }

  deleteJogo(jogo: Jogo): void {
    if (jogo) {
      const id = jogo.id;
      if (confirm('Tem certeza que deseja apagar este jogo?')) {
        this.jogosService.removeJogo(id).subscribe(() => {
          location.reload();
          this.router.navigate(['/adm-jogos']);
        });
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-adm'])
  }

}
