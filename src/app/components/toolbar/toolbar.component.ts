import { Component } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent {

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) {}

  isLoggedOut() {
    return !this.authService.isLoggedIn;
  }

  openSignupDialog(): void {
    this.dialog.open(SignupComponent).afterClosed().subscribe(result => {
    })
  }

  openLoginDialog(): void {
    if (!this.isLoggedOut()) {
      // Clear the user token from local storage
      localStorage.removeItem('userToken');
      // Navigate back to the home screen
      this.router.navigate(['']);
      // Set the isLoggedIn property in your AuthService to false
      this.authService.isLoggedIn = false;
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {});
      dialogRef.afterClosed().subscribe(result => {
        // Handle the login result here if needed
      });
    }
  }
  
}
