import { Injectable } from "@angular/core";
import { TransportService } from './transport.service';
import { PledgeStatus, Recital, RecitalType, RecitatStatus } from "src/app/models/api-models";

@Injectable()
export class RecitalService {
    constructor(private transport: TransportService) {}

    async pledgeToRecite(inviteCode: string, itemName: string, userName: string): Promise<void> {
        return Promise.resolve();
    }

    async markRecitalAsComplete(inviteCode: string, itemName: string, userName: string): Promise<void> {
        return Promise.resolve();
    }

    async getRecitalDetails(inviteCode: string): Promise<Recital> {
        const response:Recital = {
            recitalType: RecitalType.Khattam,
            recitalName: '20 yaseen for the elderly', // or khattam for loved one
            startedDate: '2021-12-12',
            recitalStatus: RecitatStatus.Pending,
            recitalItems: [
                {
                    itemName: 'Supara 1',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Pledged
                },
                {
                    itemName: 'Supara 2',
                    status: PledgeStatus.NotStarted
                },
                {
                    itemName: 'Supara 3',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 4',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Pledged
                },    {
                    itemName: 'Supara 5',
                    usersName: 'Taariq Ghoord',
                    status: PledgeStatus.Complete
                },    {
                    itemName: 'Supara 6',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 7',
                    usersName: 'Yasmeen Ghoord',
                    status: PledgeStatus.Complete
                },                
                {
                    itemName: 'Supara 8',
                    usersName: 'Fatima Cachalia',
                    status: PledgeStatus.Complete
                },
                {
                    itemName: 'Supara 9',
                    status: PledgeStatus.NotStarted
                },
                {
                    itemName: 'Yaseen 10',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 11',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Complete
                },    {
                    itemName: 'Supara 12',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Complete
                },    {
                    itemName: 'Supara 13',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 14',
                    usersName: 'User with twenty let',
                    status: PledgeStatus.Complete
                },                {
                    itemName: 'Supara 15',
                    usersName: 'Ebrahim Ghoord',
                    status: PledgeStatus.Complete
                },
                {
                    itemName: 'Supara 16',
                    status: PledgeStatus.NotStarted
                },
                {
                    itemName: 'Supara 17',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 18',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Pledged
                },    {
                    itemName: 'Supara 19',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Complete
                },    {
                    itemName: 'Supara 20',
                    status: PledgeStatus.NotStarted
                },    {
                    itemName: 'Supara 21',
                    usersName: 'Tee Gee',
                    status: PledgeStatus.Pledged
                }
            ]
        }
        return Promise.resolve(response);
    }
}


