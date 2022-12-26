import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AutheticationService} from "../../services/authentication/authetication.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginPage: boolean = true;
  invalidLogin: boolean = false;
  username: string = "";
  name: string = "";
  surname: string = "";
  password = "";
  phone = "";
  email = "";


  constructor(
    private http: HttpClient,
    private router: Router,
    private loginservice: AutheticationService
  ) { }

  ngOnInit(): void {
  }

  openLogin() {
    this.loginPage = true;
  }

  openRegistration() {
    this.loginPage = false;
  }
  async checkLogin() {
    const isLogin: boolean = await this.loginservice.authenticate(this.email, this.password);
    if (isLogin) {
      this.router.navigate(['']);
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }
  async signup() {
    const isRegistered: boolean = await this.loginservice.signup({
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      country: 'almaty',
    });
    if (isRegistered) {
      this.openLogin()
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }
}
