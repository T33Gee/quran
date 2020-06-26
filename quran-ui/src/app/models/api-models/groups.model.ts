export interface Group {
    groupId: number;
    groupName: string;
    groupPrivacy: GroupPrivacyEnum;
}

export enum GroupPrivacyEnum {
    PUBLIC = 1,
    PRIVATE = 2
}