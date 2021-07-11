import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class SessionService {
    storeUser(u: User) {
        sessionStorage.setItem("user", JSON.stringify(u));
    }
    getUser(): User {
        this.storeUser({userId: 1, username: "user 1", email:"a@b.com"}); /// TODO remove 
        return JSON.parse(sessionStorage.getItem("user")) as User;
    }
}