import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getTranslatedError } from '@nafuzi/firebase-auth-error-translator';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {

    if (this.loginForm.invalid) return;

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(credentials => {
      Swal.close();
      this.router.navigate(['/']);
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getTranslatedError('es', error.code),
      })
    });
  }

}
