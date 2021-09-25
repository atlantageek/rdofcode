import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommService } from '../services/comm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _authenticationService:CommService, private _router:Router) {
    const currentUser = this._authenticationService.currentUserValue;
    if (!currentUser) {
      this._router.navigate(['/welcome'])
    }
   }

  ngOnInit(): void {
  }

}
