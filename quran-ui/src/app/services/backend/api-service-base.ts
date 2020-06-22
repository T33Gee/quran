import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    public baseUrl = "http://localhost/Quran/api/index.php";
    constructor(private _http: HttpClient){
    }
    public get(url, params?): Promise<any> {
        return this._http.get(`${this.baseUrl}/${url}`).toPromise();
    }
}