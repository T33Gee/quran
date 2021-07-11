export interface InvitedUser {
    name: string;
    inviteCode: string;    
    emailAddress?: string;
}

export interface Recital {
    recitalType: RecitalType;
    recitalName: string;
    startedDate: string;  
    recitalStatus: RecitatStatus;
    recitalItems: PledgeToRecite[];
} 

export interface PledgeToRecite{
    itemName: string;
    usersName?: string;
    status: PledgeStatus;
}

export enum RecitatStatus{
    Pending = 'Pending',
    Complete = 'Complete'
}

export enum RecitalType {
    Khattam = 'Khattam',
    Surah = 'Surah'
}

export enum PledgeStatus {
    NotStarted = 'NotStarted',
    Pledged = 'Pledged',
    Complete = 'Complete'
}
