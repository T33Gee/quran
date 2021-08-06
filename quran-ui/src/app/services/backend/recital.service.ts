import { Injectable } from "@angular/core";
import { TransportService } from './transport.service';
import { PledgeStatus, RecitalDetails, RecitalItemStatusChangeRequest, RecitalType, RecitatStatus } from "src/app/models/api-models";

@Injectable()
export class RecitalService {
    constructor(private transport: TransportService) {}

    async pledgeToRecite(request: RecitalItemStatusChangeRequest): Promise<void> {
        return await this.transport.post('pledge', request);
    }

    async markRecitalItemAsComplete(request: RecitalItemStatusChangeRequest): Promise<void> {
        return await this.transport.post('pledgeComplete', request);
    }

    async getRecitalDetails(inviteCode: string): Promise<RecitalDetails> {
        return await this.transport.get<RecitalDetails>(`recital/${inviteCode}`);
    }
}


