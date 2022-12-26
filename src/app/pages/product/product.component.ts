import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { HttpClient } from '@angular/common/http';

interface IBook {
  id: number;
  name: string;
  desc: string;
  author: string;
  image: string;
  category: {
    id: number,
    name: string
  };
  created_at?: null | string;
}
interface IBookDTO {
  data: IBook;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId = '';
  product: IBook = {
    id: -1,
    name: 'loading',
    desc: 'loading',
    author: 'loading',
    image: 'loading',
    category: {
      id: -1,
      name: 'loading'
    },
    created_at: null,
  };

  constructor(
    private route: ActivatedRoute,
    private _toastService: ToastService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    if (this.route.snapshot.params['id'] !== undefined) {
      this.productId = this.route.snapshot.params['id'];
    }

    console.log(this.productId)

    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<IBookDTO>(`https://book-share.abmco.kz/api/books/${this.productId}`)
        .subscribe({
          next: (response: IBookDTO) => {
            this.product = response.data as IBook;
            console.log(this.product)
            this.product.image =
              'https://book-share.abmco.kz/storage/images/books/' + this.product.image;
            this.product.desc = this.product.desc.substring(0, 256) + '...';

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
    return this.product
    // console.log(this.productId);
  }

  addToBasket(item: any) {
    let products = JSON.parse(localStorage.getItem('items') || '[]');
    // @ts-ignore
    if (products.find((pr) => pr.id === item.id) === undefined) {
      products.push({ ...item, count: 1 });
      localStorage.setItem('items', JSON.stringify(products));
      this._toastService.success(`"${item.name}" added to basket`);
    } else {
      this._toastService.warn(`"${item.name}" is already exist in basket`);
    }
  }

  addToFavorite(item: any) {
    console.log(item);
    let products = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log(products);
    // @ts-ignore
    if (products.find((pr) => pr.id === item.id) === undefined) {
      products.push(item);
      localStorage.setItem('favorites', JSON.stringify(products));
      this._toastService.success(`"${item.name}" added to favorites`);
    } else {
      this._toastService.warn(`"${item.name}" is already exist in favorites`);
    }
  }
}
