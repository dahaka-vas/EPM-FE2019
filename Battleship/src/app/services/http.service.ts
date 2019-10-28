import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient ) { }

  getShipsData () {
    return this.http.get('/assets/configs.json')
  }

  getAdvicesData () {
    return this.http.get('/assets/advices.json')
  }
}
