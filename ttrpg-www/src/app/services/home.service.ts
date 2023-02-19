import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  gameSelected$: BehaviorSubject<string> = new BehaviorSubject<string>("TTRPG App");

  constructor() {}

}
