import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_log = {
    email: "",
    password: ""
  }

  error_message = {
    login: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._service.login(this.user_log, 
      (res) => {
        console.log("from login com: ", res);
        if(res.error == undefined) {
          this._router.navigate(['/dashboard']);
        }
        else {
          this.error_message.login = res.error;
        }
      });
    this.user_log = {
      email: "",
      password: ""
    };
  }


}










