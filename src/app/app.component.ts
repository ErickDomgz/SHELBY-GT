import { Component } from '@angular/core';
import { ContactosComponent } from './components/contactos/contactos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactosComponent], // Importamos el componente correctamente
  template: `<app-contactos></app-contactos>`, // Mostramos el componente en el HTML
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShelbyGT';
}

