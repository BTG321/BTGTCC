import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/Empresa';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent implements OnInit {
  empresas: Empresa[];
  empresa: Empresa;
  searchText: string = '';
  faTrash = faTrashCan;
  faSearch = faSearch;

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
  ) {}

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  deleteEmpresa(empresa: Empresa): void {
    if (empresa) {
      const id = empresa.id;
      if (confirm('Tem certeza que deseja apagar esta empresa?')) {
        this.empresaService.removeEmpresa(id).subscribe(() => {
          location.reload();
          this.router.navigate(['/administracao']);
        });
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-adm'])
  }

}
