export interface InvitedUser {
    name: string;
    inviteCode: string;    
    emailAddress?: string;
}

export interface Recital {
    inviteCode: string;
    recitalType: RecitalType;
    recitalName: string;
    startedDate: string;  
    recitalStatus: RecitatStatus;
}

export interface RecitalDetails extends Recital {
    recitalItems: PledgeToRecite[];
} 

export interface RoomEnteredResponse{
    accessToken: string;
}

export interface EnterRoomRequest{
    inviteCode: string;
    username: string;
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


export interface LoginResponse {
    success: boolean;
    menuItems: string[];
}

export interface AuthorizationResponse {
    accessToken: string;
}


export interface RecitalAddedResponse {
    inviteCode: string;
}

export interface RecitalItemStatusChangeRequest {
    inviteCode: string;
    itemName: string;
    username: string;
}

export interface AddRecitalRequest {
    recitalName: string;
    recitalType: RecitalType;
    recitalNumberOfTimes: number;
}