import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-self',
  templateUrl: './edit-self.component.html',
  styleUrls: ['./edit-self.component.css']
})
export class EditSelfComponent implements OnInit {
  user;
  updateinfo = {
    email: "",
    first_name: "",
    last_name: ""
  }
  password_update;
  passwordcon;
  description;
  error_message = {
    email: ""
  }

  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.user == undefined) {
      this._router.navigate(['/'])
    }
    this.user = this._service.user;
    console.log(this.user);
  }

  update() {
    this._service.update(this.updateinfo, (res) => {
      console.log("from service update info: success update");
      if(res.success == "success") {
        console.log("from edit other com update: success update");
        this._router.navigate(['dashboard']);
      }
      else {
        this.error_message.email = "This email has been registered."
      }
    })
    this._router.navigate(['dashboard']);  
    this.updateinfo = {
      email: "",
      first_name: "",
      last_name: ""
    }
  }

  updatepassword() {
    console.log("from com updatepassword: ", this.password_update);
    this._service.updatepassword(this.password_update, (res) => {
      console.log("from com update password: success update", res);
    })
    this._router.navigate(['dashboard']);
    this.password_update = "";
  }

  add_description() {
    console.log("from com add des: ", this.description);
    this._service.add_description(this.description, (res) => {
      console.log("from com add description success: ", res);
    })
    this._router.navigate(['dashboard']);
    this.description = "";
  }
  

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

}
















