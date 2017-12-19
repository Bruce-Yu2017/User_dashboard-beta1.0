import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_reg = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  password_confirm = {
    con: ""
  }

  error_message = {
    email: "",
    login: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log("from com register: ", this.user_reg);
    this._service.register(this.user_reg,
      (res) => {
        if (res.success === "success") {
          this._router.navigate(['/dashboard'])
        }
        else {
          this.error_message.email = "This email has been registered.";
        }
        this.user_reg = {
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

}
