import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-adm',
  templateUrl: './login-adm.component.html',
  styleUrls: ['./login-adm.component.css']
})
export class LoginAdmComponent implements OnInit {
  username: string = 'beyondthegame';
  password: string = 'btg0711212327';

  admForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.admForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        senha: ['', [Validators.required]]
      }
    )
  }

  get dadosForm() {
    return this,this.admForm.controls;
  }

  loginAdm() {
    if(this.dadosForm["nome"].value == 'beyondthegame' && this.dadosForm["senha"].value == 'btg0711212327') {
      localStorage.setItem('token', Math.random().toString());
      this.router.navigate(['/administracao']);
    } else {
      alert('Ocorreu um erro!')
    }
  }
}
