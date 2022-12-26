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
  books: IBook[];
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent extends UserActionsService implements OnInit {
  books: any[] = [
    {
      id: '1',
      name: 'Порядок в Хаосе',
      desc:
        'What is Lorem Ipsum?\n' +
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        '\n' +
        'Why do we use it?\n' +
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '2',
      name: 'Порядок в Хаосе',
      desc: 'Description of book',
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '1',
      name: 'Порядок в Хаосе',
      desc:
        'What is Lorem Ipsum?\n' +
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        '\n' +
        'Why do we use it?\n' +
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '2',
      name: 'Порядок в Хаосе',
      desc: 'Description of book',
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '1',
      name: 'Порядок в Хаосе',
      desc:
        'What is Lorem Ipsum?\n' +
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        '\n' +
        'Why do we use it?\n' +
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '2',
      name: 'Порядок в Хаосе',
      desc: 'Description of book',
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '1',
      name: 'Порядок в Хаосе',
      desc:
        'What is Lorem Ipsum?\n' +
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
        '\n' +
        'Why do we use it?\n' +
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
    {
      id: '2',
      name: 'Порядок в ',
      desc: 'Description of book',
      author: 'Author of book',
      image: 'assets/bookCover.jpg',
      category_id: '',
      created_at: '',
    },
  ];

  query = '';

  constructor(
    router: Router,
    _toastService: ToastService,
    http: HttpClient,
    private route: ActivatedRoute,
  ) {
    super(router, _toastService, http);
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.updateQuery();
      console.log(routeParams);
    });
  }

  updateQuery() {
    this.books = [];
    if (this.route.snapshot.params['query'] !== undefined) {
      this.query = this.route.snapshot.params['query'];
      this.books = this.books.filter(
        (value) =>
          value.name.toString().toLowerCase().indexOf(this.query) !== -1
      );
    }

    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .post<IBookDTO>(`https://book-share.abmco.kz/api/search`, {
          text: this.query,
        })
        .subscribe({
          next: (response: IBookDTO) => {
            this.books = response.books as IBook[];
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

    promise;
  }
}
