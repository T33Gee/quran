import { Injectable } from "@angular/core";
import { AdminInfo, NavItemEnum, ReciterInfo } from "../models/view-modes";

@Injectable()
export class SessionService {
    public storeReciterToken(jwt: string) {
        localStorage.setItem("authorization", jwt);
        localStorage.setItem("username", this.parseToken(jwt).username);
    }   

    get adminSessionIsSet(): boolean {
      return this.getAdminDetails() && this.getAdminDetails().access.includes(NavItemEnum.CreateRecital)
    }



    public storeAdminToken(jwt: string) {
      localStorage.setItem("authorization", jwt);
    }   

    public getAdminDetails(): AdminInfo {
      const token  = localStorage.getItem("authorization")
      return this.parseToken(token);
    }

    public clearToken() {
      localStorage.removeItem("authorization");
    }

    public clearAdminToken() {
      localStorage.clear();
    }

    public getReciterUsername() {
      return localStorage.getItem("username");
    }   
    
    public getReciterDetails(): ReciterInfo {
      const token  = localStorage.getItem("authorization")
      return this.parseToken(token);
    }

    private parseToken(token: string): ReciterInfo  {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
    }
}