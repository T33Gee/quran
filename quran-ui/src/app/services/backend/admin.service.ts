import { Injectable } from "@angular/core";
import { LoginResponse, Recital, RecitalAddedResponse, RecitalType, RecitatStatus } from "src/app/models/api-models";
import { TransportService } from './transport.service';

@Injectable()
export class AdminService {
    constructor(private transport: TransportService) {}

    async validateLogin(username: string, password: string): Promise<LoginResponse> {
        return Promise.resolve({
            success: username === "1",
            menuItems: ["View Created recitals","Logout"]
        });
    }

    async addNewRecital(recitalName: string, recitalType: RecitalType, recitalNumberOfTimes = 0): Promise<RecitalAddedResponse> {
        return Promise.resolve({
            inviteCode: "1111111"
        })
    }

    async getRecitals(username: string): Promise<Recital[]> {
        return Promise.resolve([...Array(1000).keys()].map(x => {
            return {
                    inviteCode: `1111111${x}`,
                    recitalType: Math.random() < 0.5 ? RecitalType.Khattam :RecitalType.Surah,
                    recitalName: `recital ${x}`,
                    startedDate: new Date().toDateString(),  
                    recitalStatus: Math.random() < 0.5 ? RecitatStatus.Pending: RecitatStatus.Complete
            }
        }));
    }


}