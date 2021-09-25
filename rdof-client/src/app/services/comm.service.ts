import { DebugEventListener, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import * as moment from "moment";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface IRegion {
    polygon:any,
    reserve:number,
    county:string,
    state:string,
    census_id: string,
    location_count:number,
    selected?:boolean,
    addr_count?:number
}
export interface IAddress {
    unit: string,
    number: string,
    street: string,
    city: string,
    region: string,
    postcode: string,
    st_x: number,
    st_y: number
}
@Injectable()
export class CommService {
    currentUserValue:number = null;
    constructor(private http: HttpClient) {
        if (this.isLoggedIn()) {
            this.currentUserValue=parseInt(localStorage.getItem("user_id"))
        }

    }
    login(email:string, password:string) {
        
        let user_credentials = {username: email, password:password}
        return this.http.post('/api/login', user_credentials).pipe(tap(res=> this.setSession(res)),catchError(this.handleError))
    }

    private setSession(authResult) {
        if (authResult.hasOwnProperty('error')) throw <string>authResult.error;
        const expiresAt = moment().add(authResult.expiresIn,'second');
        console.log(authResult.idToken);
        this.currentUserValue=authResult.user.id;
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('user_id', authResult.user.id)
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    } 
    logout() {
        localStorage.removeItem("id_token"); 
        localStorage.removeItem("expires_at");
        this.currentUserValue = null;
    }

    public isLoggedIn() {
        return true; //Temporarily do this.

    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
    storeAois(aois:IRegion[]) {
        let path = '/api/aois/' + this.currentUserValue;
        this.http.post(path, aois).toPromise().then((result) => {
            
        })
    }
    getAois() {
        let path = '/api/aois/' + this.currentUserValue;
        return this.http.get(path).toPromise().then((result) => {
            result["selected"] = true

            return result;
        })
    }
    getLayers():Promise<any[]> {
        let path='/api/layers/'
        return this.http.get<any[]>(path).toPromise().then((res) => {return res }, (err) => {return []})
        
    }
    getAddressRows(params, targetArea: any) {
        let path = '/api/searcharea/' + params.startRow + "/" + (params.endRow - params.startRow)
        this.http.post(path, targetArea).subscribe({
            next: (data: IAddress[]) => {
                let lastRow = data.length < (params.stopRow - params.startRow)
                params.successCallback(data, lastRow)
            },
            error: error => {
                console.error(error);
            }
        })
    }
    getPolygon(lat:number,lng:number):Promise<IRegion> {
        let path = '/api/getlocation';
        let result:Promise<IRegion> = this.http.get(path, {params:{"lat": ''+lat, "lng": ''+lng}}).toPromise().then( data =>{
            if (data == null) return null;
            let json_str = data["geom"];
            let polygon = JSON.parse(json_str);
            debugger;
            return {polygon: json_str, 
                reserve:data["reserve"], 
                county:data["county"],
                state:data["state"],
                census_id: data["census_id"],
                location_count: data["location_count"]}
            }
   
        )
        return result;
    }
    register(body:any):Observable<any> {
        let result = this.http.post('/api/users/', body).pipe(
            catchError(this.handleError)
        )
        return result;
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}