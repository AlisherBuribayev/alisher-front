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
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent extends UserActionsService implements OnInit {
  books: IBook[] = [];
  tempBooks: IBookDtopItem[] = [];

  constructor(router: Router, _toastService: ToastService, http: HttpClient) {
    super(router, _toastService, http);
  }

  ngOnInit(): void {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>(`https://book-share.abmco.kz/api/v1/likes`, {headers: this.getAuthToken()})
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

  removeFromFavorites(item: IBook) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get(
          `https://book-share.abmco.kz/api/v1/like/isLike/${item.id}`,
          { headers: this.getAuthToken(), responseType: undefined  },
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

    void promise.catch(() => {});
  }
}
