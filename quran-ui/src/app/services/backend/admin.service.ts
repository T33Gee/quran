import { Injectable } from "@angular/core";
import { AddRecitalRequest, AuthorizationResponse, LoginResponse, Recital, RecitalAddedResponse, RecitalType, RecitatStatus } from "src/app/models/api-models";
import { SessionService } from "../session.service";
import { TransportService } from './transport.service';

@Injectable()
export class AdminService {
    constructor(private transport: TransportService, private sessionService: SessionService) {}

    async validateLogin(username: string, password: string): Promise<AuthorizationResponse> {
        const response = await this.transport.post<AuthorizationResponse>('auth/login', {username: username, password: password}, null, {responseType: 'json'});
        this.sessionService.storeAdminToken(response.accessToken);
        return response;
    }

    async addNewRecital(request: AddRecitalRequest): Promise<RecitalAddedResponse> {
        return await this.transport.post('admin-recital', request, null, {responseType: 'json'});
    }

    async getRecitals(): Promise<Recital[]> {
        return await this.transport.get<Recital[]>('admin-recital');
    }


}