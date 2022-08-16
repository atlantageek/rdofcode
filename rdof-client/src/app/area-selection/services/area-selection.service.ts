import {  Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { IRegion } from 'src/app/services/comm.service';
interface IBounds {
    xMin:number,
    xMax:number,
    yMin:number,
    yMax:number
}

@Injectable()
export class AreaSelectionService {
    public aois:BehaviorSubject<IRegion[]>= new BehaviorSubject<IRegion[]>([]);//areas of interest
    public zoomArea:BehaviorSubject<any>=new BehaviorSubject(null);
    //private _aois:IRegion[]=[];

    appendAoi(aoi:IRegion){
        
        let _aois = this.aois.value
        let idx = _aois.findIndex((elem) => elem.census_id == aoi.census_id)
        if (idx == -1) {
            aoi.selected=true;
            let _aois = this.aois.value.concat([aoi]);
            this.aois.next(_aois);
            return true;
        }
        return false;
    }

    redrawAoi() {
        let _aois=this.aois.value;
        this.aois.next(_aois)
    }
    getBoundingBox(data:any) {
      var bounds:IBounds = {xMin:9999,xMax:-9999,yMin:9999,yMax:-9999};
      var coordinates, point, latitude, longitude;

      debugger;
      coordinates = data.coordinates;

            // It's a MultiPolygon
            // Loop through each coordinate set
      for (var j = 0; j < coordinates.length; j++) {
            // For each individual coordinate in this coordinate set...
        for (var k = 0; k < coordinates[j][0].length; k++) {
          debugger;
          longitude = coordinates[j][0][k][0];
          latitude  = coordinates[j][0][k][1];
      
              // Update the bounds recursively by comparing the current xMin/xMax and yMin/yMax with the current coordinate
          bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
          bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
          bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
          bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
        }
      }
          
        
      
        // Returns an object that contains the bounds of this GeoJSON data.
        // The keys describe a box formed by the northwest (xMin, yMin) and southeast (xMax, yMax) coordinates.
        return bounds;
    }
}