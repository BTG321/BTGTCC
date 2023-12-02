import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info-jogo',
  templateUrl: './info-jogo.component.html',
  styleUrls: ['./info-jogo.component.css']
})
export class InfoJogoComponent implements OnInit {
  @Input() jogoSelecionado: Jogo;
  @Output() fecharPopUpEvent = new EventEmitter<void>();

  constructor(
    private jogosService: JogosService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  faPencil = faPencil;
  faTrash = faTrashCan;

  ngOnInit(): void {}

  fecharPopUp() {
    this.fecharPopUpEvent.emit();
  }

  excluirJogo(jogo: Jogo) {
    if (confirm('Tem certeza que deseja apagar este jogo?')) {
    this.jogosService.removeJogo(jogo.id).subscribe(
      response => {
        alert('Jogo excluído com sucesso');
        location.reload();
        this.jogoSelecionado = null
      },
      error => {
        alert('Erro ao excluir o jogo');
      }
    );
    }
  }

}
