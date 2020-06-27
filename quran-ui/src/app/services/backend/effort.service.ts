import { Injectable } from '@angular/core';
import { TransportService } from './transport.service';
import { EffortTypeEnum, Effort, Part, Chapter, EffortStatusEnum, KhatamEffortStatusEnum } from 'src/app/models/api-models/effort.model';

@Injectable()
export class EffortService {
    constructor(private transport: TransportService) {}

    getUserEfforts(userId, groupId): Promise<Effort[]> {
        return Promise.resolve([
            {
                effortId: 1,
                groupId: 1,
                effortType: EffortTypeEnum.Khatam,
                effortStatus: EffortStatusEnum.InProgress,
                parts: [
                    {partId:1, partName: "chapter 1", user: {userId: 1, username:"user 1"}, status: KhatamEffortStatusEnum.Read},
                    {partId:2, partName: "chapter 2", user: {userId: 2, username:"user 2"}, status: KhatamEffortStatusEnum.Reading},
                    {partId:3, partName: "chapter 3", status: KhatamEffortStatusEnum.Unread}
                ]
            },
            {
                effortId: 2,
                groupId: 1,
                effortType: EffortTypeEnum.Surah,
                effortStatus: EffortStatusEnum.InProgress,
                surahId: 2,
                surahName: "surah 2",
                goalRecitations: 100,
                currentRecitations: [{amount: 10, user: {userId: 1, username:"user 1"}}, {amount:20, user: {userId: 2, username:"user 2"}}],
                status
            }
        ]);
    }

}