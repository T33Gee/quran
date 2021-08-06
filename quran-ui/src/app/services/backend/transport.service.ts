import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable()
export class TransportService {
    public baseUrl = "http://localhost:8080";
    tokenKey = "authorization"
    constructor(private httpClient: HttpClient){
    }
    
    get<T>(action: string, params?: HttpParams): Promise<T> {
        return this.httpClient
            .get<T>(this.getApiUrl(action), {
                params,
                headers: this.getHeaders()
            })
            .toPromise();
    }

    post<T>(
        action: string,
        payload: any,
        params?: HttpParams,
        options?: { responseType: string }
    ): Promise<T> {
        if (options && options.responseType === 'json') {
            return this.httpClient
                .post<T>(this.getApiUrl(action), payload, {
                    headers: this.getHeaders(),
                    observe: 'response',
                    responseType: 'json',
                    params
                })
                .toPromise()
                .then(res => res.body);
        }

        return this.httpClient
            .post(this.getApiUrl(action), payload, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text',
                params
            })
            .toPromise().then();

    }

    put<T>(
        action: string,
        payload: any,
        params?: HttpParams,
        options?: { responseType: string }
    ): Promise<T> {
        if (options && options.responseType === 'json') {
            return this.httpClient
                .put<T>(this.getApiUrl(action), payload, {
                    headers: this.getHeaders(),
                    observe: 'response',
                    responseType: 'json',
                    params
                })
                .toPromise()
                .then(res => res.body);
        }

        return this.httpClient
            .put(this.getApiUrl(action), payload, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text',
                params
            }).toPromise().then();
        
    }

    delete(action: string, params?: HttpParams): Promise<void> {
        return this.httpClient.delete(this.getApiUrl(action), {params, headers: this.getHeaders(), responseType: 'text'}).toPromise().then();
    }

    getBinary(action: string): Promise<HttpResponse<ArrayBuffer>> {
        const url = this.getApiUrl(action);
        return this.httpClient.get(url, {observe: 'response'
        , responseType: 'arraybuffer'
        , headers: this.getHeaders() }).toPromise();
    }

    private getApiUrl(query) {
        return this.baseUrl+"/"+query;
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
//             .append('Access-Control-Allow-Origin', '*');
            

        const token = localStorage.getItem(this.tokenKey);
        if (token) headers = headers.append('Authorization', 'Bearer ' + token);

        // const clientId = this.session.getClient()?.id;
        // if (clientId) headers = headers.append('ClientId', clientId);
        
        return headers;
    }
    
}