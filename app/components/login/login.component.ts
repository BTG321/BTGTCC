import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;

  loginForm: FormGroup;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    public formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        senha: ['', [Validators.required]]
      }
    )
  }

  get dadosForm() {
    return this,this.loginForm.controls;
  }
  
  loginUser(){
    this.authService.login(this.dadosForm["nome"].value, this.dadosForm["senha"].value).subscribe(
      (response: any) => {
        const token = response.token; 
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/home-biblioteca']);
        }
      },
      (err) => {
        alert('Ocorreu um erro');
      }
    );
  }

}
