import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute, Router } from '@angular/router';
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
interface IBookDTO {
  data: [{
    book: IBook[];
    name: string
  }];
}

@Component({
  selector: 'app-list',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent extends UserActionsService implements OnInit {
  books: IBook[] = [];
  categoryId: number = -1;
  categoryName: string = 'Loading';

  query = '';

  constructor(
    router: Router,
    _toastService: ToastService,
    http: HttpClient,
    private route: ActivatedRoute,
    ) {
    super(router, _toastService, http);
  }

  async ngOnInit() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this.categoryId = this.route.snapshot.params['id'];
    }

    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>(
          `https://book-share.abmco.kz/api/category/${this.categoryId}`
        )
        .subscribe({
          next: (response: IBookDTO) => {
            this.categoryName = response.data[0].name;

            this.books = response.data[0].book as IBook[];
            this.books = this.books.map((book: IBook) => {
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

    await promise;
  }

}
