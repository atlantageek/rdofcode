import { Component, OnInit,Input } from '@angular/core';
import { AreaSelectionService } from '../../services/area-selection.service';
import { AgGridCheckboxComponent } from '../ag-grid-checkbox/ag-grid-checkbox.component';
import { AgGridJumpComponent } from '../ag-grid-jump/ag-grid-jump.component';
import {  Map } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  aoisColumnDefs = [
    { field: 'selected', cellRendererFramework: AgGridCheckboxComponent,headerName: '', width:20, resizable:true},
    {  cellRendererFramework: AgGridJumpComponent,headerName: '', width:60, resizable:true, filter:false},
    { field: 'census_id',  headerName:'Census ID', width:130, resizable:true},
    { field: 'housing', headerName: 'Housing Count', width:70, resizable:true},
    {field: 'population',headerName:'Population', width:70, resizable:true}
  ];

@Input() map:Map;
  private areaGridApi;
  private areaGridColumnApi;

  constructor(public areaSelectionService: AreaSelectionService) { }

  ngOnInit(): void {
  }
  onAreaGridReady(params) {
    this.areaGridApi = params.api;
    this.areaGridColumnApi = params.columnApi;
    console.log("ongridready for aois");
    //this.areaGridApi.sizeColumnsToFit() 
    this.areaSelectionService.aois.subscribe((data) => {
      this.areaGridApi.sizeColumnsToFit() 
      console.log("resize");
    })
  }

  public onRowSelected(e:any) {
    if (!e.node.selected) return;
      let obj=JSON.parse(e.data.polygon);

      console.log(e.data);
      let boundingBox = this.areaSelectionService.getBoundingBox(obj);
      if (this.map != null && boundingBox!= null) {
        this.map.fitBounds(L.latLngBounds(L.latLng(boundingBox.yMin,boundingBox.xMin),L.latLng(boundingBox.yMax, boundingBox.xMax)))
      }
      // debugger;
      // this.aois=this.aois.map(aoi => {
      //   aoi.selected = e.node.selected;
      //   return aoi;
      // });
  }
}
