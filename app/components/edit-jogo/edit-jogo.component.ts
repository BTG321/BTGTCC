import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Jogo } from 'src/app/Jogo';
import { JogosService } from 'src/app/services/jogos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-jogo',
  templateUrl: './edit-jogo.component.html',
  styleUrls: ['./edit-jogo.component.css']
})
export class EditJogoComponent implements OnInit {
  jogo: Jogo
  btnText: string = 'Editar';
  gameId: number;
  jogoSelecionado: string = '';

  editForm: FormGroup;

  constructor(
    private jogosService: JogosService,
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.formBuilder.group({
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      nome: ['', Validators.required],
      classificacao: ['', Validators.required],
      empresa_id: [''],
      empresa: [null]
    })
  }

ngOnInit(): void {
   // Obtém o ID do jogo da rota
   this.route.params.subscribe(params => {
    this.gameId = params['id'];

    // Faz a solicitação HTTP para obter os detalhes do jogo com base no ID
    this.http.get(`https://localhost:7043/api/Jogo/${this.gameId}`).subscribe(
      (data: any) => {
        this.jogo = data;
        console.log('Detalhes do jogo:', this.jogo);
      },
      error => {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    );
  });
}


salvarEdicao() {
  if (this.editForm.valid) {
    const jogoData = this.editForm.value;

    this.jogosService.updateJogo(this.gameId, jogoData).subscribe(
      (response) => {
        console.log('Jogo editado com sucesso!', response);
        alert('Jogo editado com sucesso!');
        this.router.navigate(['/home-biblioteca']);
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

}


