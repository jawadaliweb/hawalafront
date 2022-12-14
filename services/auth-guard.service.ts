import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}

  canActivate(){
    if (this.authservice.login())  {
      this.router.navigate
    };
    return false
  }
}
