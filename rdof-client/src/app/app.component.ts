import { Component, Input } from '@angular/core';
import { CommService } from './services/comm.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rdof-client';

  @Input() showBackButton: boolean;
  @Input() currentTitle: string;
  @Input() showHistoryNav: boolean;

  get currentUser() {
    return this.authenticationService.currentUserValue;
  }
  constructor(private authenticationService: CommService) { 
  const currentUser = this.authenticationService.currentUserValue;
}
}
