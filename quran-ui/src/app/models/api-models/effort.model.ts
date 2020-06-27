import { User } from './user.model';

export interface Effort {
    effortId: number,
    groupId: number,
    effortType: EffortTypeEnum,
    effortStatus: EffortStatusEnum;
}

export interface SurahEffort extends Effort {
    surahs: SurahEffortItem[];
}

export interface SurahEffortItem {
    surahId: number;
    surahName: string;
    goalRecitations: number;
    currentRecitations: UserRecitingSurah[];
    openRecitations: number;
}

export interface KhatamEffort extends Effort {
    parts: Part[];
}
//goalamount, amount, in progress
export interface UserRecitingSurah {
    amount: number;
    user: string;
}

export interface Part {
    partId: number;
    partName: string;
    user?: User;
    status: KhatamEffortStatusEnum;
}


export interface Chapter {
    chapterId: number;
    chapterName: string;
}

export enum EffortTypeEnum {
    Surah = 1,
    Khatam = 2
}

export enum KhatamEffortStatusEnum {
    Read = 1,
    Reading = 3,
    Unread = 2,
}

export enum EffortStatusEnum {
    InProgress = 1,
    Complete = 2
}