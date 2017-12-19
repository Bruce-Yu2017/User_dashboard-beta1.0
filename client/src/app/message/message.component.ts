import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  current_user;
  target_user = {
    first_name: "",
    last_name: "",
    email: "",
    createdAt: "",
    description: ""
  };
  target_id;
  message = {
    content: ""
  };

  comment = {
    content: ""
  }
  
  constructor(private _service: MainService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.current_user = this._service.user;
    if(localStorage.user == undefined) {
      this._router.navigate(['/'])
    }
    this._route.paramMap.subscribe(params => {
      this._service.retrieveOneUser(params.get("id"), (res) => {
        this.target_user = res;
        this.target_id = res._id;
        console.log("this", this.target_user);
        
      })
    })
  }

  create_message() {
    this._service.create_message(this.message, this.target_id, (res) => {
      console.log("from message com create success: ", res);
      this._route.paramMap.subscribe(params => {
        this._service.retrieveOneUser(params.get("id"), (res) => {
          this.target_user = res;
        })
      })
    })
    
    this.message = {
      content: ""
    }
  }

  create_comment(msg_id) {
    this._service.create_comment(msg_id, this.comment, (res) => {
      console.log("from message com create comment success");
    })
    this._route.paramMap.subscribe(params => {
      this._service.retrieveOneUser(params.get("id"), (res) => {
        this.target_user = res;
      })
    })
    this.comment = {
      content: ""
    }
  }

  delete_message(msg_id) {
    this._service.delete_message(msg_id, (res) => {
      console.log("delete success: ", res);
    })
    this._route.paramMap.subscribe(params => {
      this._service.retrieveOneUser(params.get("id"), (res) => {
        this.target_user = res;
      })
    })
  }

  delete_comment(comm_id) {
    this._service.delete_comment(comm_id, (res) => {
      console.log("delete comment success: ", res);
    })
    this._route.paramMap.subscribe(params => {
      this._service.retrieveOneUser(params.get("id"), (res) => {
        this.target_user = res;
      })
    })
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/']);
  }

}
