import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { TransportService } from './transport.service';

@Injectable()
export class AcceptInviteService {
    constructor(private transport: TransportService) {}

    async validateInviteCode(inviteCode: string): Promise<boolean> {
        return Promise.resolve(inviteCode === '11111111');    
    }

}