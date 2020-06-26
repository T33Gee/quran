import { Injectable } from "@angular/core";
import { TransportService } from './transport.service';
import { User } from 'src/app/models/api-models/user.model';
import { Group, GroupPrivacyEnum } from 'src/app/models/api-models/groups.model';

Injectable()
export class UserService {
    constructor(private transport: TransportService) {}

    getUsersInGroup(groupId: number): Promise<User[]> {
        return Promise.resolve(
             [
                {
                    userId: 1,
                    username: "user 1",
                    email: "user1@mock.com"
                },
                {
                    userId: 2,
                    username: "user 2",
                    email: "user2@mock.com"
                },
                {
                    userId: 3,
                    username: "user 3",
                    email: "user3@mock.com"
                },
            ]
        )
    }
    getGroupsUserIsIn(userId: number): Promise<Group[]> {
       return Promise.resolve(
            [
                {
                    groupId: 1,
                    groupName: "Group 1",
                    groupPrivacy: GroupPrivacyEnum.PRIVATE
                },
                {
                    groupId: 2,
                    groupName: "Group 2",
                    groupPrivacy: GroupPrivacyEnum.PUBLIC
                }                
            ]
        )
    }

}