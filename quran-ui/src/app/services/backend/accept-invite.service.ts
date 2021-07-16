import { Injectable } from "@angular/core";
import { User } from "src/app/models/user.model";
import { TransportService } from './transport.service';

@Injectable()
export class AcceptInviteService {
    constructor(private transport: TransportService) {}

    signIn(username: string, password: string): Promise<{success: boolean}> {
        return Promise.resolve({
                success: username&&password? true: false
            });
    }

    signUp(user: User): Promise<{success: boolean}> {
        return Promise.resolve({
                success: user? true: false
            });    
    }

    async validateInviteCode(inviteCode: string): Promise<boolean> {
        return Promise.resolve(inviteCode === '11111111');    
    }

}