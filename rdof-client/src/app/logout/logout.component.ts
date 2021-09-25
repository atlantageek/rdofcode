import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'ag-grid-community';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _commService:CommService, private _router:Router) {
    setTimeout(() => {
      this._router.navigate(['/'])
    }, 3000)

   }

  ngOnInit(): void {
    this._commService.logout();
  }

}
