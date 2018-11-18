import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ride } from './rides';
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
    return this.http.get('http://127.0.0.1:3000/api/getRides');
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

  currUser()
  {
    return 'api/user/profile.json';
  }
}
