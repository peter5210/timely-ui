import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.css']
})
export class SignUpCardComponent implements OnInit {

    private username ='';
    private password ='';
    private error: string;


  constructor(private http: Http) { }

  ngOnInit() {
  }

  get disableButton() {
    return this.username.length === 0 ||
           this.password.length === 0;
  }

  submitSignup() {
      const payload = {
        username: this.username,
        password: this.password
      };
      const options = {
        withCredentials: true
      };
      const cookieUrl = 'http://localhost:5000/api/clients';
      const sessionUrl = 'http://localhost:5000/api/users';
      this.http
        .get(cookieUrl, options)
        .catch(() => this.http.put(sessionUrl, payload, options))
        .subscribe(
          () => {
            this.error = '';
            console.log('logged in');
          },
          e => {
            if (e.status === 401) {
              this.error = 'Could not log in with those credentials';
            }
          },
        );
    }
  }
