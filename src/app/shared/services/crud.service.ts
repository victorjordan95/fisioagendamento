import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    // baseURL = environment.baseURL;
    private header = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    });

    constructor(private http: HttpClient) { }

    // getProduct() {
    //     return this.http.get(`${this.baseURL}/api/products`);
    // }
}
