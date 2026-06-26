import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';

@Component({
  selector: 'rw-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <rw-navbar />
    <main class="min-h-screen bg-gray-50">
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'rewear-frontend';
}
