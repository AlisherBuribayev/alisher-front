import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserActionsService } from '../../services/user-actions/user-actions.service';
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

interface IBookDtopItem {
  book: IBook
}

interface IBookDTO {
  data: IBookDtopItem[];
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent extends UserActionsService implements OnInit {
  books: IBook[] = [];
  tempBooks: IBookDtopItem[] = [];
  isModalActive: boolean = false;
  location: string = '';

  constructor(router: Router, _toastService: ToastService, http: HttpClient) {
    super(router, _toastService, http);
  }

  ngOnInit(): void {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>(`https://book-share.abmco.kz/api/v1/cart`, {headers: this.getAuthToken()})
        .subscribe({
          next: (response: IBookDTO) => {
            this.tempBooks = response.data as IBookDtopItem[];
            this.books = this.tempBooks.map((item: IBookDtopItem) => {
              item.book.image =
                'https://book-share.abmco.kz/storage/images/books/' +
                item.book.image;
              item.book.desc = item.book.desc.substring(0, 42) + '...';
              return item.book;
            });

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

    promise;
  }

  removeFromBasket(item: IBook) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(
          `https://book-share.abmco.kz/api/v1/cart/delete/${item.id}`,
          { headers: this.getAuthToken() }
        )
        .subscribe({
          next: () => {
            this.books = this.books.filter((book) => book.id !== item.id);
            resolve();
          },
          error: (err: any) => {
            this._toastService.error(`не получилось`);
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    promise;
  }

  activateModal() {
    this.isModalActive = true;
  }

  closeModal() {
    this.isModalActive = false;
  }

  sendToDeliver() {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(
          `https://book-share.abmco.kz/api/v1/orders`,
          {
            address: this.location
          },
          { headers: this.getAuthToken() }
        )
        .subscribe({
          next: () => {
            this._toastService.success(`Ждите ваши книги ;)`);
            this.books = [];
            this.closeModal();
            resolve();
          },
          error: (err: any) => {
            this._toastService.error(`не получилось`);
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    promise;
  }
}
