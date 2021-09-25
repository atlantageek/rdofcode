import { Component, OnInit } from '@angular/core';
import { AreaSelectionService } from '../../services/area-selection.service';
import { AgGridCheckboxComponent } from '../ag-grid-checkbox/ag-grid-checkbox.component';
import { AgGridJumpComponent } from '../ag-grid-jump/ag-grid-jump.component';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  aoisColumnDefs = [
    { field: 'selected', cellRendererFramework: AgGridCheckboxComponent,headerName: '', width:20, resizable:true},
    {  cellRendererFramework: AgGridJumpComponent,headerName: '', width:60, resizable:true, filter:false},
    { field: 'census_id',  headerName:'Census ID', width:70, resizable:true},

    { field: 'addr_cnt', resizable:true, width:40}
  ];


  private areaGridApi;
  private areaGridColumnApi;

  constructor(public areaSelectionService: AreaSelectionService) { }

  ngOnInit(): void {
  }
  onAreaGridReady(params) {
    this.areaGridApi = params.api;
    this.areaGridColumnApi = params.columnApi;
    console.log("ongridready");
    //this.areaGridApi.sizeColumnsToFit() 
    this.areaSelectionService.aois.subscribe((data) => {
      this.areaGridApi.sizeColumnsToFit() 
      console.log("resize");
    })
  }

  public onRowSelected(e:any) {

      //let obj=JSON.parse(e.data.polygon);
      //let boundingBox = this.areaSelectionService.getBoundingBox(obj);
      //debugger;
      // this.aois=this.aois.map(aoi => {
      //   aoi.selected = e.node.selected;
      //   return aoi;
      // });
  }
}
