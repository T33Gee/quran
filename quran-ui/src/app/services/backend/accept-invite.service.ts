import { Injectable } from "@angular/core";
import { AuthorizationResponse } from "src/app/models/api-models";
import { User } from "src/app/models/user.model";
import { TransportService } from './transport.service';

@Injectable()
export class AcceptInviteService {
    constructor(private transport: TransportService) {}

    async validateInviteCode(inviteCode: string): Promise<boolean> {
        const response: AuthorizationResponse = {accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnZpdGVDb2RlIjoiUko2SUFHMDIiLCJhY2Nlc3MiOlsiYWNjZXB0LWludml0ZSJdLCJpYXQiOjE2MjcxNDQ3MTMsImV4cCI6MTYyNzE0ODMxM30.XrB4PtZUQC48_vKq34o-4ObTxg4-6TCjuBlpTH6o7UI"};
        return Promise.resolve(response.accessToken !== '');
    }

}