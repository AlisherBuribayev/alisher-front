import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ISignUpData {
  name: string;
  surname: string;
  phone: string;
  password: string;
  country: string;
  email: string;
}

interface IToken {
  access_token: string;
  user: number;
}

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  constructor(private http: HttpClient) {}

  async signup(payload: ISignUpData) {
    let isLogin: boolean = false;

    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post('https://book-share.abmco.kz/api/v1/register', payload)
        .subscribe({
          next: () => {
            isLogin = true;
            resolve();
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    await promise;

    return isLogin;
  }

  async authenticate(email: string, password: string) {
    const data = {
      email,
      password,
    };
    let isLogin: boolean = false;

    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post<IToken>('https://book-share.abmco.kz/api/v1/login', data)
        .subscribe({
          next: (response: IToken) => {
            isLogin = true;
            sessionStorage.setItem('username', email);
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('user', response.user.toString());
            resolve();
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    await promise;
    sessionStorage.setItem('username', email);

    return isLogin;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }

  getUserId() {
    return sessionStorage.getItem('userId');
  }
}
