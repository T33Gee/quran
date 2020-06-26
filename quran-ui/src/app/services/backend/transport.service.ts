import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TransportService {
    public baseUrl = "http://localhost/Quran/api/index.php";
    constructor(private _http: HttpClient){
    }
    public get(url: string): Promise<any> {
        return this._http.get(`${this.baseUrl}/${url}`).toPromise();
    }
    public post(url: string, params?: HttpParams): Promise<any> {
        return this._http.post(`${this.baseUrl}/${url}`, params).toPromise();
    }
}