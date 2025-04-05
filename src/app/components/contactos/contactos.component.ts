import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { CrudService, Contacto } from '../../services/crud.service';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent {
  contactos: Contacto[] = [];
  nombre = '';
  telefono = '';
  correo = '';
  editandoId: number | null = null;

  constructor(private crudService: CrudService) {
    this.contactos = this.crudService.obtenerContactos();
  }

  agregarContacto() {
    if (!this.nombre || !this.telefono || !this.correo) return;
    
    if (this.editandoId !== null) {  
      // Creamos el objeto contactoEditado solo con las propiedades necesarias (sin el id)
      const contactoEditado: Omit<Contacto, 'id'> = {
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo
      };

      // Llamamos a editarContacto pasando el id y el objeto contactoEditado
      this.crudService.editarContacto(this.editandoId, contactoEditado);  
      this.editandoId = null;
    } else {
      const nuevoContacto: Omit<Contacto, 'id'> = {
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo
      };
      this.crudService.agregarContacto(nuevoContacto);
    }

    // Refrescamos la lista de contactos después de agregar o editar
    this.contactos = this.crudService.obtenerContactos();
    this.limpiarFormulario();
  }

  editarContacto(contacto: Contacto) {
    this.nombre = contacto.nombre;
    this.telefono = contacto.telefono;
    this.correo = contacto.correo;
    this.editandoId = contacto.id; // Establecemos el ID del contacto que se está editando
  }

  eliminarContacto(id: number) {
    this.crudService.eliminarContacto(id);
    this.contactos = this.crudService.obtenerContactos(); // Refrescamos la lista después de eliminar
  }

  limpiarFormulario() {
    this.nombre = '';
    this.telefono = '';
    this.correo = '';
    this.editandoId = null; // Reseteamos el ID de edición
  }
}
