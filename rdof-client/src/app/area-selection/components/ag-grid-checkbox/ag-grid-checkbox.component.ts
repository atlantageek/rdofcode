import { Component, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams} from 'ag-grid';
import { AreaSelectionService } from '../../services/area-selection.service';

@Component({
  selector: 'app-ag-grid-checkbox',
  templateUrl: './ag-grid-checkbox.component.html',
  styleUrls: ['./ag-grid-checkbox.component.css']
})
export class AgGridCheckboxComponent implements AgRendererComponent {

  public params: any;

  constructor(private areaSelectionService: AreaSelectionService) {

  }

  agInit(params: any): void {
    this.params = params;

  }

//   afterGuiAttached(params?: IAfterGuiAttachedParams): void {
//   }

  refresh(params: any): boolean {

    params.data.selected = params.value
    console.log(params.value);
    params.api.refreshCells(params);
    this.areaSelectionService.redrawAoi();
    return false;
  }
}