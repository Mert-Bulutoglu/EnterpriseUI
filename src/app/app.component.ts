import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // For *ngIf and *ngFor
import { FormsModule } from '@angular/forms';  // For ngModel

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,  // For routing
    CommonModule,  // For *ngIf, *ngFor, etc.
    FormsModule,  // For ngModel binding
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EnterpriseUI';
}
