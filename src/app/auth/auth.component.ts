import { AuthService } from 'services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}
  ngOnInit() {
    this.loginprocess();
  }

  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  get username() {
    return this.loginform.get('username');
  }
  get password() {
    return this.loginform.get('password');
  }
  wrongLogin: boolean = false;
  loginprocess() {
    this.wrongLogin = false;
    if (this.loginform.valid) {
      let data = new FormData();
      data.append('username', <any>this.username?.value);
      data.append('password', <any>this.password?.value);
      this.authservice
        .login(data)
        .then((res) => {})
        .catch((error) => {
          if (error.status === 401) {
            this.wrongLogin = true;
          }
        });
    }
  }
}
