export interface RecitalStat {
    name: string;
    percentage: string;
}

export enum NavItemEnum {
    /*ADMIN*/
    CreateRecital='admin-home',
    ViewList='admin-list',
    Logout='admin',
    /*NON-ADMIN*/
    Exit='accept-invite'
}

export interface ReciterInfo {
    username: string;
    inviteCode: string;
    access: NavItemEnum[];
}

export interface AdminInfo {
    username: string;
    access: NavItemEnum[];
}