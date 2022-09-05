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
import { AreaSelectionService } from './services/area-selection.service';
import { getLocaleEraNames } from '@angular/common';
import 'leaflet-measure'

import '../../../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';
class LinearMeasurement extends L.Control {
  options:L.ControlOptions = {position:'topleft'};
  onAdd(map:Map):HTMLElement {

    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
    link = L.DomUtil.create('a', 'icon-ruler', container),
    map_container = map.getContainer();
    let me = this;

    L.DomEvent.on(link, 'click', L.DomEvent.stop).on(link, 'click', function(){
      if(L.DomUtil.hasClass(link, 'icon-active')){
          me.resetRuler(!!this.mainLayer);
          L.DomUtil.removeClass(link, 'icon-active');
          L.DomUtil.removeClass(map_container, 'ruler-map');

      } else {
          me.initRuler();
          L.DomUtil.addClass(link, 'icon-active');
          L.DomUtil.addClass(map_container, 'ruler-map');
      }
  });
    return container; 
  }
  resetRuler(any){}
  initRuler() {
    console.log("init ruler")
  }
}



@Component({
  selector: 'app-area-selection',
  templateUrl: './area-selection.component.html',
  styleUrls: ['./area-selection.component.css']
})
export class AreaSelectionComponent implements OnInit {
  drawMode:boolean=false;
  geojson:GeoJSON;
  layerJsonGroup: L.LayerGroup<any>;
  
  constructor(private commService: CommService, private areaSelectionService:AreaSelectionService) {

  }

  ngOnInit(): void {
    this.commService.getAois().then((data:IRegion[]) => {
      this.areaSelectionService.aois.next(data)
    })
  }

  rowData: BehaviorSubject<IAddress[]> = new BehaviorSubject<IAddress[]>([]);
  private gridApi;
  private gridColumnApi;

  public map:Map;
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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      // tileLayer.wms(
      //   'http://localhost/cgi-bin/mapserv?map=/usr/lib/cgi-bin/myfirst.map&SERVICE=WMS&VERSION=1.1.1&',
      //   {
      //     transparent: true,
      //     layers: 'admin',
      //     // accessToken: '82dd5a670dacb72990c1bcd79deb0190',
      //     format: 'image/png',
      //     attribution: 'Something',
      //     maxZoom: 23, crs: CRS.EPSG4326

      //   }),
        // tileLayer.wms(
        //   'http://localhost/cgi-bin/mapserv?map=/usr/lib/cgi-bin/myfirst.map&SERVICE=WMS&VERSION=1.1.1&',
        //   {
        //     transparent: true,
        //     layers: 'states',
        //     // accessToken: '82dd5a670dacb72990c1bcd79deb0190',
        //     format: 'image/png',
        //     attribution: 'Something',
        //     maxZoom: 23, crs: CRS.EPSG4326
  
        //   }),  
        // tileLayer.wms(
        //   'http://localhost/cgi-bin/mapserv?map=/usr/lib/cgi-bin/myfirst.map&SERVICE=WMS&VERSION=1.1.1&income=100000&',
        //   {
        //     transparent: true,
        //     layers: 'rdof2',
        //     // accessToken: '82dd5a670dacb72990c1bcd79deb0190',
        //     format: 'image/png',
        //     attribution: 'Something',
        //     maxZoom: 23, crs: CRS.EPSG4326
  
        //   }),
        //  tileLayer.wms(
        //     'http://localhost/cgi-bin/mapserv?map=/usr/lib/cgi-bin/myfirst.map&SERVICE=WMS&VERSION=1.1.1&',
        //     {
        //       transparent: true,
        //       layers: 'fiber_boxes',
        //       // accessToken: '82dd5a670dacb72990c1bcd79deb0190',
        //       format: 'image/png',
        //       attribution: 'Something',
        //       maxZoom: 23, crs: CRS.EPSG4326
    
        //     }),
            // tileLayer.wms(
            //   'http://localhost/cgi-bin/mapserv?map=/usr/lib/cgi-bin/myfirst.map&SERVICE=WMS&VERSION=1.1.1&start_income=50000',
            //   {
            //     transparent: true,
            //     layers: 'datafilter',
            //     // accessToken: '82dd5a670dacb72990c1bcd79deb0190',
            //     format: 'image/png',
            //     attribution: 'Something',
            //     maxZoom: 23, crs: CRS.EPSG4326
      
            //   })
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


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("ongridready")
    this.areaSelectionService.aois.subscribe((areas) => {
      console.log("AOIS changed.")

      this.layerJsonGroup.clearLayers()
      areas.forEach((area) => {
        if (area.selected){

          let dobj=JSON.parse(area.polygon)
          this.layerJsonGroup.addLayer(L.geoJSON(dobj))
        }
      })
    })

    this.areaSelectionService.zoomArea.subscribe((area) => {
      if (area == null) return;
      let dobj=JSON.parse(area)
      let zoomArea=L.featureGroup([L.geoJSON(dobj)])
      this.map.fitBounds(zoomArea.getBounds())
    })
  }

  public getPolygon(e:any) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;
    this.commService.getPolygon(lat,lng).then((aoi) => {
      if (aoi == null ) {
        return false
      };
      let added = this.areaSelectionService.appendAoi(aoi);
    })
  }

  public storeAois() {
    let aois=this.areaSelectionService.aois.value.filter(aoi=> aoi.selected)
    if (aois.length ==0) alert("No Areas stored.")
    else this.commService.storeAois(aois)
  }

  public onDrawStarted(e:any) {
    // this.drawnItems.eachLayer((layer) => {
    //   this.drawnItems.removeLayer(layer)
    // })
  }
  public onDrawCreated(e: any) {

    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
    console.log("Draw Created!")
    this.submitRegions();
  }
  public submitRegions() {
    console.log("Submit Regions")
    let geojson = this.drawnItems.toGeoJSON();
    var datasource = {
      rowCount: null,
      getRows: (params) => this.commService.getAddressRows(params, geojson)
    }
    this.gridApi.setDatasource(datasource)
  }
 
  public onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize();
      this.map = map;
      this.layerJsonGroup = new L.LayerGroup();
      this.layerJsonGroup.addTo(this.map);
      L.control.coordinates({}).addTo(map);
      this.areaSelectionService.aois.subscribe((areas) => {
        console.log("AOIS changed.")
        this.layerJsonGroup.clearLayers()
        areas.forEach((area) => {
          if (area.selected){
  
            let dobj=JSON.parse(area.polygon)
            this.layerJsonGroup.addLayer(L.geoJSON(dobj))
          }
        })
      })
    //   L.control.coordinates({
    //     position:"bottomleft", //optional default "bootomright"
    //     decimals:2, //optional default 4
    //     decimalSeperator:".", //optional default "."
    //     labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
    //     labelTemplateLng:"Longitude: {x}", //optional default "Lng: {x}"
    //     enableUserInput:true, //optional default true
    //     useDMS:false, //optional default false
    //     useLatLngOrder: true, //ordering of labels, default false-> lng-lat
    //     markerType: L.marker, //optional default L.marker
    //     markerProps: {}, //optional default {},
    //     labelFormatterLng : function(lng){return lng+" lng"}, //optional default none,
    //     labelFormatterLat : function(lat){return lat+" lat"}, //optional default none
    //   }).addTo(map);
    });
    // var measControl = new LinearMeasurement();
    // measControl.addTo(map)
    // var measurementControl = L.control.measure({})
    // measurementControl.addTo(map)
  }
}
  