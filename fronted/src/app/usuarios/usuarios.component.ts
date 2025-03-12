import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any[] = [];
  totalUsuarios: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  search: string = ''; // Valor de búsqueda
  mensaje: string='';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Método para cargar los usuarios desde el backend
  cargarUsuarios(): void {
    this.usuarioService.getUsuarios(this.currentPage, this.search).subscribe(data => {
      this.usuarios = data.usuarios;
      this.totalUsuarios = data.total;
      this.totalPages = data.totalPages;

      // Si no se encuentran usuarios, mostrar un mensaje
      if (this.usuarios.length === 0) {
        this.mensaje = 'No se encontraron usuarios con ese término de búsqueda.';
      } else {
        this.mensaje = ''; // Si se encuentran usuarios, no mostrar mensaje
      }
    });
  }

  // Método para realizar la búsqueda
  buscarUsuarios(): void {
    this.currentPage = 1; // Reiniciar a la primera página cuando se realice una nueva búsqueda
    this.cargarUsuarios(); // Volver a cargar los usuarios con los filtros aplicados
  }

  // Cambiar página de los usuarios
  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.cargarUsuarios(); 
  }
}
