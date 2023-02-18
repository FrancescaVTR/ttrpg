import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = "http://localhost:5000/";

  constructor(
    private http: HttpClient
  ) { }

  getHomeSideMenu() {
    return this.http.get(`${this.url}menuItem`);
  }
}
