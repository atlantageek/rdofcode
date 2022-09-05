import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, CRS, FeatureGroup, featureGroup, DrawEvents, Polygon, Map,GeoJSON } from 'leaflet';

import { catchError, retry } from 'rxjs/operators';
//import 'angular-leaflet-measure';
import { BehaviorSubject } from 'rxjs';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { IDatasource } from 'ag-grid-community';
import {IAddress, IRegion, CommService} from '../services/comm.service'
import * as L from 'leaflet';
import { allowedNodeEnvironmentFlags } from 'process';

import { getLocaleEraNames } from '@angular/common';


import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';




@Component({
  selector: 'app-dataviz',
  templateUrl: './dataviz.component.html',
  styleUrls: ['./dataviz.component.css']
})
export class DatavizComponent implements OnInit {
  drawMode:boolean=false;
  geojson:GeoJSON;
  layerJsonGroup: L.LayerGroup<any>; 
  
  constructor(private commService: CommService) {

  }

  async ngOnInit() {
    let layers = await this.commService.getLayers()
    let base_layers={}
    let overlay_layers={}
    //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }).addTo(this.map)
    layers.forEach(layer => {
      if (layer.base_layer && layer.layer_type == 'tile') {
        base_layers[layer.layer_name]=L.tileLayer(layer.layer_url, { maxZoom: 18, attribution: '...' }).addTo(this.map)
      }
      else if (layer.base_layer && layer.layer_type == 'wms') {
        base_layers[layer.layer_name]= L.tileLayer.wms(layer.layer_url, {layers:'default', format:'image/png',attribution: layer.layer_name}).addTo(this.map)
      }
      else if (!layer.base_layer && layer.layer_type == 'tile') {
        overlay_layers[layer.layer_name]=L.tileLayer(layer.layer_url, { maxZoom: 18, attribution: '...' }).addTo(this.map)
      }
      else if (!layer.base_layer && layer.layer_type == 'wms'){
        overlay_layers[layer.layer_name]= L.tileLayer.wms(layer.layer_url, {layers:'default', format:'image/png',attribution: layer.layer_name}).addTo(this.map)
      }
    })

   L.control.layers(base_layers,overlay_layers).addTo(this.map)

    
  }

  rowData: BehaviorSubject<IAddress[]> = new BehaviorSubject<IAddress[]>([]);
  private gridApi;
  private gridColumnApi;

  private map:Map;
  columnDefs = [
    { field: 'unit' },
    { field: 'number' },
    { field: 'street' },
    { field: 'city' },
    { field: 'region' },
    { field: 'postcode' }
  ];
  options = {
    layers: [
      
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };


  drawnItems: FeatureGroup = featureGroup();

  drawOptions = {
    // position: 'topright',
    // edit:  {
    //   featureGroup: this.drawnItems
    // },
    draw: {
      polyline: false,
      marker: false,
      circle: false,
      rectangle: false,
      square: false,
      circlemarker: false
    },
    edit: {
      featureGroup: this.drawnItems
    }
  };

  getPolygon(event) {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("ongridready")

  }

 
  public onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      this.layerJsonGroup = new L.LayerGroup();
      this.layerJsonGroup.addTo(this.map);
      L.control.coordinates({}).addTo(map);

    });

  }
}
  