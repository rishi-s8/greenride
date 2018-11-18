import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ride, Pool } from './rides';
// import 'rxjs/add/operator/catch';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  constructor(private http: HttpClient) { }

  getRides()
  {
    let x = this.http.get('http://127.0.0.1:3000/api/getRides');
    console.log(x);
    return x;
  }

  addRide(newRide)
  {
    let body = JSON.stringify(newRide);
    console.log(body);
    let x = this.http.post('http://127.0.0.1:3000/api/addRide', body, httpOptions);
    console.log(x);
    return x;
  }

  deleteRide(id)
  {
    let body = JSON.stringify(id);
    return this.http.post('http://127.0.0.1/3000/api/deleteRide', body, httpOptions);
  }

  addPool(newPool)
  {
    let body = JSON.stringify(newPool);
    return this.http.post('http://127.0.0.1:3000/api/addPool', body, httpOptions);
  }

  deletePool(id)
  {
    let body = JSON.stringify(id);
    return this.http.post('http://127.0.0.1:3000/api/deletePool', body, httpOptions);
  }

  currUser()
  {
    return this.http.get('http://127.0.0.1:3000/api/getCurrentUser');
  }
}
