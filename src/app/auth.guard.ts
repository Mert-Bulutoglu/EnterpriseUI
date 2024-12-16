import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Allow access if the token exists
    } else {
      // Redirect to login if the token is not present
      this.router.navigateByUrl("/login");
      return false; // Explicitly return false to satisfy the method's return type
    }
  }
}
