import { Component, OnInit } from '@angular/core';
//import { userInfo } from 'os';
import { User, CSRF, Views } from './structures';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  server: string = 'http://localhost:3000';
  title: string = 'hw4';
  view: Views = Views.login;
  user: User = new User();
  csrf: CSRF = new CSRF();

  constructor() {
  }

  ngOnInit() {
    this.auth();
  }

  postUser = function (email, password) {
    let user = { email: email, password: password, defaults: null }
    fetch(this.server + '/gathering/v1/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then(function (res) {
      return res.json();
    }).then(user => {
      console.log(user);
    }).catch(function (err) {
      alert("failed to post user: " + err);
    });
  };

  auth = function () {
    fetch(this.server + '/gathering/v1/auth', {
      method: 'GET'
    }).then(function (res) {
      return res.json();
    }).then(body => {
      if ('msg' in body) {
        throw body.msg;
      }
      if (body.status) {
        this.user = (body.user);
        this.view = Views.deckList;
      } else {
        this.view = Views.login;
        this.csrf.set(null);
      }
    }).catch(function (err) {
      alert("login invalid: " + err);
    });
  }

  login = function () {
    // let email = $('#email-input').val();
    // let password = $('#password-input').val();
    fetch(this.server + '/gathering/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ email: email, password: password }),
    }).then(function (res) {
      this.csrf.set(res.headers.get('X-CSRF'));
      return res.json();
    }).then(user => {
      if ('msg' in user) {
        throw user.msg;
      }
      this.view = Views.deckList;
    }).catch(function (err) {
      alert("login invalid: " + err);
    });
  }

  logout = function () {
    fetch(this.server + '/gathering/v1/logout', {
      method: 'POST',
    }).then(function (res) {
      this.csrf.set(null);
      this.view = Views.login;
    }).catch(function (err) {
      alert("logout invalid: " + err);
    });
  }
}
