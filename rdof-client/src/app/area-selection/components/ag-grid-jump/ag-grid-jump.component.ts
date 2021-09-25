import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams} from 'ag-grid';
import { AreaSelectionService } from '../../services/area-selection.service';

@Component({
  selector: 'app-ag-grid-jump',
  templateUrl: './ag-grid-jump.component.html',
  styleUrls: ['./ag-grid-jump.component.css']
})
export class AgGridJumpComponent implements AgRendererComponent {

  private params: any;
  constructor(public areaSelectionService: AreaSelectionService) { }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event) {
    debugger;

    this.areaSelectionService.zoomArea.next(this.params.data.polygon)
  }

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
  refresh(params: any): boolean {
    return true;
  }
}