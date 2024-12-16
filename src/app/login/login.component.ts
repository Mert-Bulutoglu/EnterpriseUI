import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import {UserLoginModel} from '../models/UserLoginModel';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoginModel = new UserLoginModel();
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.userLoginModel).subscribe(
      (response: any) => {
        // Store token, role, and permissions
        localStorage.setItem('token', response.token);
        localStorage.setItem('roleName', response.roleName);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('permissions', JSON.stringify(response.permissions));

        this.router.navigateByUrl("/product-list");
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
