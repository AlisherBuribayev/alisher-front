import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarOptions = [
    {
      title: "Главная",
      isActive: true,
      link: "/"
    },
    {
      title: "Планы",
      isActive: false,
      link: "#plans"
    },
    {
      title: "Каталог",
      isActive: false,
      link: "#catalog"
    },
    {
      title: "Доставка",
      isActive: false,
      link: "/"
    },
    {
      title: "магазине",
      isActive: false,
      link: "/"
    },
    {
      title: "О нас",
      isActive: false,
      link: "#about"
    }
  ];
  query = "";
  isAuth: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if( token ) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }


  search() {
    this.router.navigate([`/list/${this.query}`])
  }
}
