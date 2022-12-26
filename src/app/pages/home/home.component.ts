import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { HttpClient } from '@angular/common/http';
import { UserActionsService } from '../../services/user-actions/user-actions.service';
import { Router } from '@angular/router';

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
interface IBookDTO {
  data: {
    data: IBook[];
  };
}

interface ICategory {
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
interface ICategoryDTO {
  data: {
    data: ICategory[];
  };
}

interface ISubscriptionPlan {
  id: number;
  name: string;
  money: string;
  term: string;
}
interface ISubscriptionPlanDTO {
  data: ISubscriptionPlan[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends UserActionsService implements OnInit {
  books: IBook[] = [];
  saleBooks: IBook[] = [];
  library: IBook[] = [];
  categories: ICategory[] = [];
  subscriptions: ISubscriptionPlan[] = [];

  constructor(router: Router, _toastService: ToastService, http: HttpClient) {
    super(router, _toastService, http);
  }

  async ngOnInit() {
    const fetchBooks = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>('https://book-share.abmco.kz/api/books')
        .subscribe({
          next: (response: IBookDTO) => {
            this.books = response.data.data as IBook[];
            this.books = this.books.map((book: IBook) => {
              book.image =
                'https://book-share.abmco.kz/storage/images/books/' +
                book.image;
              book.desc = book.desc.substring(0, 42) + '...';
              return book;
            });
            this.saleBooks = this.books.filter(
              (book: IBook) => book.rank === 2
            );
            this.books = this.books.filter((book: IBook) => book.rank === 1);
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

    const fetchLibrary = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>('https://book-share.abmco.kz/api/v1/library', {headers: this.getAuthToken()})
        .subscribe({
          next: (response: IBookDTO) => {
            this.library = response.data.data as IBook[];
            this.library = this.library.map((book: IBook) => {
              book.image =
                'https://book-share.abmco.kz/storage/images/books/' +
                book.image;
              book.desc = book.desc.substring(0, 42) + '...';
              return book;
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

    const fetchCategories = new Promise<void>((resolve, reject) => {
      this.http
        .get<ICategoryDTO>('https://book-share.abmco.kz/api/categories')
        .subscribe({
          next: (response: ICategoryDTO) => {
            this.categories = response.data.data as ICategory[];
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    const fetchSubscriptionPlans = new Promise<void>((resolve, reject) => {
      this.http
        .get<ISubscriptionPlanDTO>(
          'https://book-share.abmco.kz/api/subscription'
        )
        .subscribe({
          next: (response: ISubscriptionPlanDTO) => {
            this.subscriptions = response.data as ISubscriptionPlan[];
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    await Promise.all([
      fetchBooks,
      fetchCategories,
      fetchSubscriptionPlans,
      fetchLibrary,
    ]);
  }

  buySubscription(plan: ISubscriptionPlan) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post(
          `https://book-share.abmco.kz/api/v1/subscription/${plan.id}`,
          null,
          {
            headers: this.getAuthToken(),
          }
        )
        .subscribe({
          next: () => {
            this._toastService.success(`"${plan.name}" - подписка офермлена`);
            resolve();
          },
          error: (err: any) => {
            this._toastService.error(
              `"${plan.name}" - не получилось оформить подписку`
            );
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
