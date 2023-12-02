import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Usuario';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.component.html',
  styleUrls: ['./adm-usuarios.component.css']
})
export class AdmUsuariosComponent implements OnInit {
  usuarios: Usuario[];
  usuario: Usuario;
  searchText: string = '';
  
  faTrash = faTrashCan;
  faSearch = faSearch;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
     this.usuarioService.getUsuarios().subscribe(data => {
       this.usuarios = data;
     });
  }

   deleteUsuario(usuario: Usuario): void {
     if (usuario) {
       const id = usuario.id;
       if (confirm('Tem certeza que deseja apagar este usuário?')) {
         this.usuarioService.removeUsuario(id).subscribe(() => {
           location.reload();
           this.router.navigate(['/adm-usuarios']);
         });
       }
     }
   }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-adm'])
  }


}
