import { Injectable } from "@angular/core";
import { AuthorizationResponse, EnterRoomRequest, RoomEnteredResponse } from "src/app/models/api-models";
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


    async enterRoomAsUser(request: EnterRoomRequest): Promise<RoomEnteredResponse> {        
        return await this.transport.post<RoomEnteredResponse>("auth/enterRoom", request, null, {responseType: "json"});
    }
}