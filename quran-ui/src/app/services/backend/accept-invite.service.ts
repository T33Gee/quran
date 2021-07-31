import { Injectable } from "@angular/core";
import { AuthorizationResponse } from "src/app/models/api-models";
import { TransportService } from './transport.service';

@Injectable()
export class AcceptInviteService {
    constructor(private transport: TransportService) {}

    async validateInviteCode(code: string): Promise<boolean> {        
        if(code.length !== 8) return false;
        try{
            await this.transport.post("auth/validateInviteCode", {inviteCode: code});
            return true;
        } catch (e) {
            return false;
        }
    }

}