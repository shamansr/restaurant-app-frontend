import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/loginService/login.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      formData.password = btoa(formData.password);
      this.loginService.login(formData).subscribe((response) => {
        // Handle the response from the backend
        localStorage.setItem('userToken', response.token); // Store the user token in local storage
        this.router.navigate(['/feed']);
        this.dialogRef.close();
        this.snackBar.open('You have logged in successfully', 'Close', {
          duration: 2000,
        });
        console.log('Response from the backend:', response);
  
        this.authService.isLoggedIn = true;
      });
    } else {
      this.authService.isLoggedIn = false;
      this.snackBar.open('Invalid credentials');
    }
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
