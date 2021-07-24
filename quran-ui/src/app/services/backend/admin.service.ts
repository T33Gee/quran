import { Injectable } from "@angular/core";
import { AuthorizationResponse, LoginResponse, Recital, RecitalAddedResponse, RecitalType, RecitatStatus } from "src/app/models/api-models";
import { TransportService } from './transport.service';

@Injectable()
export class AdminService {
    constructor(private transport: TransportService) {}

    async validateLogin(username: string, password: string): Promise<LoginResponse> {
        const response: AuthorizationResponse = {accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnZpdGVDb2RlIjoiUko2SUFHMDIiLCJhY2Nlc3MiOlsiYWNjZXB0LWludml0ZSJdLCJpYXQiOjE2MjcxNDQ3MTMsImV4cCI6MTYyNzE0ODMxM30.XrB4PtZUQC48_vKq34o-4ObTxg4-6TCjuBlpTH6o7UI"};
        return Promise.resolve({
            success: response.accessToken !== "",
            menuItems: JSON.parse(atob(response.accessToken.split('.')[1])).access
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