import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admingiris',
  templateUrl: '../ThePages/admingiris.component.html',
  styleUrls: ['../TheStyles/admingiris.component.css']
})
export class AdminGirisComponent {

  // Object to store the admin login credentials
  adminLogin = {
    username: '',
    password: ''
  };

  // Constructor to inject the Router for navigation
  constructor(private router: Router) { }

  // Method to handle the admin login process
  onAdminLogin(): void {
    this.router.navigate(['/admin']); // Navigate to the admin page upon successful login
  }

  // Method to navigate back to the main Giriş page
  goToGiris(): void {
    this.router.navigate(['/anasayfa']); // Navigate to the main Giriş (anasayfa) page
  }
}
