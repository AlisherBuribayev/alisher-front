import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ToastService } from 'angular-toastify';


interface IBook {
  id: number;
  name: string;
  desc: string;
  author: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
  created_at?: null | string;
  rank: number;
}

interface ISubscription {
  id: number;
  name: string;
  money: string;
  term: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserActionsService {
  constructor(
    public router: Router,
    public _toastService: ToastService,
    public http: HttpClient
  ) {}

  token = localStorage.getItem('token') || null;

  getAuthToken(): HttpHeaders {
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return header;
  }

  addToBasket(item: IBook) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(`https://book-share.abmco.kz/api/v1/cart/${item.id}`, null, {
          headers: this.getAuthToken(),
        })
        .subscribe({
          next: () => {
            this._toastService.success(`"${item.name}" добавлено в корзину`);
            resolve();
          },
          error: (err: any) => {
            this._toastService.error(`"${item.name}" не получилось добавить`);
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    promise;
  }

  addToFavorite(item: IBook) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(`https://book-share.abmco.kz/api/v1/like/${item.id}`, null, {
          headers: this.getAuthToken(),
        })
        .subscribe({
          next: () => {
            this._toastService.success(`"${item.name}" добавлено в любымые`);
            resolve();
          },
          error: (err: any) => {
            this._toastService.error(`"${item.name}" не получилось добавить`);
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    promise;
  }

  subscribe(item: IBook) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(`https://book-share.abmco.kz/api/v1/subscription/${item.id}`, null, {
          headers: this.getAuthToken(),
        })
        .subscribe({
          next: () => {
            this._toastService.success(`Подписка оформлена - "${item.name}"`);
            resolve();
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            this._toastService.error(`"${item.name}" не получилось подписаться`);
            console.log('complete');
          },
        });
    });

    promise;
  }

  public trackItem (index: number, item: IBook) {
    return item.id;
  }
}
