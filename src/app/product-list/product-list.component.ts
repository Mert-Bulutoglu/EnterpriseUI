import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  roleName: string | null = null;
  permissions: string[] = [];
  backgroundColor: string = 'white'; // Default background color for user

  userId = '';
  RoleName = '';
  Permissions = '';

  constructor(private http: HttpClient, private router: Router) {
    this.userId = localStorage.getItem('userId') || '';
    this.RoleName = localStorage.getItem('roleName') || '';
    this.Permissions = localStorage.getItem('permissions') || '';

  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/Product').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error(error);
      }
    );

    this.roleName = localStorage.getItem('roleName');
    const permissionsJson = localStorage.getItem('permissions');
    this.permissions = permissionsJson ? JSON.parse(permissionsJson) : [];

    if (this.roleName === 'admin') {
      this.backgroundColor = this.permissions.includes('red') ? 'red' : 'white';
    }
  }

  logout(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      this.http.delete(`http://localhost:8080/api/Auth/logout/${userId}/${token}`).subscribe(
        (response) => {
          console.log(response);
          localStorage.clear();
          this.router.navigateByUrl("/login");
        },
        (error) => {
          localStorage.clear();
          console.error(error);
          this.router.navigateByUrl("/login");
        }
      );
    } else {
      console.error("No token or user ID found in localStorage");
    }
  }

  viewProduct(productId: number): void {
    if (this.permissions.includes('blue')) {
      this.http.get(`http://localhost:8080/api/Product/productDetail/${productId}`, {
        params: { token: localStorage.getItem('token') || '' },
      }).subscribe(
        (response: any) => {
          alert(JSON.stringify(response)); // Show product details in an alert
        },
        (error) => {
          console.error(error);
          alert("You don't have permission to view this product detail.");
        }
      );
    } else {
      alert("You don't have permission to view this product detail.");
    }
  }

  purchaseProduct(productId: number): void {
    const userId = localStorage.getItem('userId');
    this.http.post('http://localhost:8080/api/Product/purchase', {
      productId,
      quantity: 1, // Assuming a default quantity
      userId: parseInt(userId || '0', 10),
    }).subscribe(
      (response: any) => {
        alert('Purchase successful.');

        this.http.get<any[]>('http://localhost:8080/api/Product').subscribe(
          (response) => {
            this.products = response;
          },
          (error) => {
            console.error(error);
          });
      },
      (error) => {
        console.error(error);
        alert('Failed to purchase product.');
      }
    );
  }

  getButtonColor(buttonType: string): string {
    if (buttonType === 'purchase') {
      return this.permissions.includes('yellow') ? 'yellow' : 'orange';
    }
    return 'primary';
  }

  isButtonVisible(buttonType: string): boolean {
    if (buttonType === 'details') {
      return this.permissions.includes('blue');
    }
    return true;
  }
}
