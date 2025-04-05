import { Injectable } from '@angular/core';

export interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private contactos: Contacto[] = [];
  private nextId = 1;

  constructor() {}

  obtenerContactos(): Contacto[] {
    return [...this.contactos]; // Devolver una copia para evitar mutaciones accidentales
  }

  agregarContacto(contacto: Omit<Contacto, 'id'>) {
    const nuevoContacto = { id: this.nextId++, ...contacto };
    this.contactos = [...this.contactos, nuevoContacto]; // Asegurar inmutabilidad
  }

  editarContacto(id: number, contactoEditado: Omit<Contacto, 'id'>) {
    this.contactos = this.contactos.map(c =>
      c.id === id ? { id, ...contactoEditado } : c
    );
  }

  eliminarContacto(id: number) {
    this.contactos = this.contactos.filter(c => c.id !== id);
  }
}
