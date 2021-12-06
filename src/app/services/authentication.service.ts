import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const server = 'localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,

  ) { }

  /**Get a resource */
  get(url: string){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(
      'http://' + server + url,
      { headers: config }
    );
  }

  /** Store or post a new resource */
  store(url:string , payload:any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url, payload,
      { headers: config }
    );

  }

  /** Show edit details of a single resource */
  show(url: string, id: any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url + '/' + id,
      { headers: config }
    );
  }

  /** update a single resource */
  update(url:string, id:any, payload:any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url + '/' + id, payload,
      { headers: config }
    );
  }

  /** Update a single resource without payload */
  updateNoPayload(url:string, id:any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url + '/' + id, 
      { headers: config }
    );
  }

  /** Update single resource without ID */
  updateNoID(url:string, payload:any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url, payload, 
      { headers: config }
    );
  }

  /** Delete a resource */
  delete(url:string, id:any){
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(
      'http://'  + server + url + '/' + id, 
      { headers: config }
    );
  }

  /** Login user */
  login(url:string, payload:any){
    const config = new HttpHeaders();
    config.append('Accept', 'application/json')
    return this.http.post(
      'http://'  + server + url, payload, {}
    );
  }

  /** Register new user */
  createUser(url: string, payload: any) {
    const config = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('http://' + server + url, payload, {
      headers: config,
    });
  }

  /** Log out  */
  logout(){
    localStorage.removeItem('userID');
    localStorage.removeItem('user');
    localStorage.removeItem('role')
  }

  /** get User */
  getUser(){
    return localStorage.getItem('user');
  }

  /** Get role */
  getRole(){
    return localStorage.getItem('role');
  }

  /** get Token */
  getToken(){
    localStorage.getItem('token');
  }

  /** Checked Logged in User */
  isLoggedIn(){
    return this.getToken !== null && this.getUser ! == null;
  }
}
