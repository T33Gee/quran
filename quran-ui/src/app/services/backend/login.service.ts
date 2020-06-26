import { Injectable } from "@angular/core";
import { TransportService } from './transport.service';
import { User } from 'src/app/models/api-models/user.model';

@Injectable()
export class LoginService {
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

}