import { Injectable } from "@angular/core";
import {  HttpParams } from '@angular/common/http';
import { ApiService } from './api-service-base';

Injectable()
export class UserService {
    constructor(private api: ApiService) {}

    getUsersInGroup(groupId): Promise<{"hi":string}> {
        return this.api.get(`${this.api.baseUrl}/welcome/sayHi`, new HttpParams());
    }
}