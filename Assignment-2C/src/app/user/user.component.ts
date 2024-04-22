import { Component, OnInit } from '@angular/core';
// import {User} from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  username = '';
  password = '';

  userList = [{
    name:"Shivam Khetan",
    pass:"33240"
  },
   {
     name:"Test User",
    pass:"12345"
  }];

  handleAdd = () => {
    console.log("clicked");
    let temp = {name:this.username, pass:this.password}
    this.userList.push(temp);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
