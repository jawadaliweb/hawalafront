import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:8000';
  auth: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  login(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/auth/jwt/create/', data).subscribe(
        (res: any) => {
          localStorage.setItem('token', res['access']);
          this.router.navigate(['/']);
          resolve(res);
        },
        (error) => reject(error)
      );
    });
  }
}
