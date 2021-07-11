import { Injectable } from "@angular/core";
import { Group, GroupPrivacyEnum } from "src/app/models/groups.model";
import { User } from "src/app/models/user.model";
import { TransportService } from './transport.service';

@Injectable()
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
    getUsersGroups(userId: number): Promise<Group[]> {
       return Promise.resolve(
            [
                {
                    groupId: 1,
                    groupName: "Group 1",
                    groupPrivacy: GroupPrivacyEnum.PRIVATE,
                    groupIntention: "intention 1",
                    groupOwner: "Owner 1"
                },
                {
                    groupId: 2,
                    groupName: "Group 2",
                    groupPrivacy: GroupPrivacyEnum.PUBLIC,
                    groupIntention: "intention 1",
                    groupOwner: "Owner 1"
                },
                {
                    groupId: 1,
                    groupName: "Group 1",
                    groupPrivacy: GroupPrivacyEnum.PRIVATE,
                    groupIntention: "intention 1",
                    groupOwner: "Owner 1"
                },                {
                    groupId: 1,
                    groupName: "Group 1",
                    groupPrivacy: GroupPrivacyEnum.PRIVATE,
                    groupIntention: "intention 1",
                    groupOwner: "Owner 1"
                },                {
                    groupId: 1,
                    groupName: "Group 1",
                    groupPrivacy: GroupPrivacyEnum.PRIVATE,
                    groupIntention: "intention 1",
                    groupOwner: "Owner 1"
                },
                
            ]
        )
    }

}