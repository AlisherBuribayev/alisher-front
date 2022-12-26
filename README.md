# AlisherFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

# Week 6-7 

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%202022-05-03%20222730.png)

# Week 8-9 ui-ux design

[ui-ux-design](https://www.figma.com/file/rOJ51nCpnJjtq3EUuIPPDR/Untitled?node-id=2%3A4)

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/main/Project/Ui/UxDesign/Снимок%20экрана%202022-05-04%20132912.png)

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/main/Project/Ui/UxDesign/Dekstop.png)

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/main/Project/Ui/UxDesign/mobile.png)

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/main/Project/Ui/UxDesign/page.png)

# Week 10 - 11 
### home page

> link code : src/app/pages/home
### basket page

>link code : src/app/pages/basket

### favorites 

>link code : src/app/pages/favorites

### login 

>link login : src/app/pages/login

# Week 12 - 13 

### basket script 

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  products = [];
  constructor() { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('items') ||'[]');
    console.log(this.products);
  }

  decrease(product: any) {

    // @ts-ignore
    this.products.forEach(value => {
      // @ts-ignore
      if(value.id === product.id){
        // @ts-ignore
        if(value.count > 1){
          // @ts-ignore
          value.count = value.count - 1;
        }
      }
    })
    console.log(this.products)
    this.updateStorage();
  }

  increase(product: any) {
    this.products.forEach(value => {
      // @ts-ignore
      if(value.id === product.id){
        // @ts-ignore
        value.count = value.count + 1;
      }
    })
    this.updateStorage();
  }

  remove(product: any) {
    // @ts-ignore
    this.products = this.products.filter(value => value.id !== product.id)
    this.updateStorage();
  }

  updateStorage(){
    localStorage.setItem('items',JSON.stringify(this.products));
  }
}

# favorites Script

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  products = [];
  constructor() { }

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem('favorites') ||'[]');
  }

  remove(product: any) {
    // @ts-ignore
    this.products = this.products.filter(value => value.id !== product.id)
    this.updateStorage();
  }

  updateStorage(){
    localStorage.setItem('favorites',JSON.stringify(this.products));
  }

}

# list Script 

> link code : src/app/pages/list/

# home script 

> link code : src/app/pages/home 

# login script

> link code: src/app/pages/login

# product script 

> link code : src/app/pages/product

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%20(223).png)

![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%20(224).png)
![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%20(225).png)
![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%20(226).png)
![image](https://github.com/SuleymanDemirelKazakhstan/diploma-project-1-6/blob/alisher-front/imgWeek/Снимок%20экрана%20(227).png)
