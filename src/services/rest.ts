import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestService {

    //urlBase = "https://cors-anywhere.herokuapp.com/http://servapibi.xm.com.co/";
    //urlBase = "http://servapibi.xm.com.co/";
    urlBase = "/";

    constructor(private http: HttpClient) { }

    public async get(url){
        
        let response = await this.http.get(this.urlBase + url).toPromise();
        console.log(response);
        return response;
    }

    public async post(url, body){
        
        var headers = {};
        headers['Content-Type'] = 'application/json';
        let response = await this.http.post(this.urlBase + url, body, {headers:headers}).toPromise();
        console.log(response);
        return response;
    }

}