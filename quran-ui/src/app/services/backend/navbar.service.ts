import { Injectable } from "@angular/core";
import { NavItemEnum  } from "src/app/models/view-modes";
import { TransportService } from './transport.service';

@Injectable()
export class NavbarAccessService {
    constructor(private transport: TransportService) {}

    async getUserAccess(userAuth: string):Promise<NavItemEnum[]> {
        const Admin = [
            NavItemEnum.CreateRecital,
            NavItemEnum.ViewList,
            NavItemEnum.Logout,
        ]
        const nonAdmin = [
            NavItemEnum.Exit
        ]
        return Promise.resolve(Admin);
    }


}