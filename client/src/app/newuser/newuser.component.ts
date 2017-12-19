import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  current_user;
  new_user = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  error_message = {
    email: "",
    login: ""
  }

  password_confirm = {
    con: ""
  }

  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    this.current_user = this._service.user;
    if(localStorage.user == undefined) {
      this._router.navigate(['/'])
    }
    if(this.current_user.user_level != 9) {
      this._router.navigate(['/']);
      localStorage.removeItem("user");
    }
  }

  add_new() {
    console.log("from com add new user: ", this.new_user);
    this._service.add_new(this.new_user,
      (res) => {
        if (res.success === "success") {
          this._router.navigate(['/dashboard'])
        }
        else {
          this.error_message.email = "This email has been registered.";
        }
        this.new_user = {
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        };
        this.password_confirm = {
          con: ""
        };
      })
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

}
