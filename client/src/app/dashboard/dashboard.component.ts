import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  current_user;
  allusers;
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.user == undefined) {
      this._router.navigate(['/'])
    }
    this.current_user = this._service.user;
    console.log("from dash com oninit: ", this.current_user);
    this._service.retrieveAllUser((res) => {
      this.allusers = res;
    })
  }

  delete_user(id) {
    console.log("from dashboard com delete: ", id);
    this._service.delete_user(id, (res) => {
      console.log("delete user success from dashboard com: ", res);
    })
    this._service.retrieveAllUser((res) => {
      this.allusers = res;
    })
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }



}
