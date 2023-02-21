import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

import { Clutch } from '../shared/models/goblinQuest';

@Injectable({
  providedIn: 'root'
})
export class GoblinQuestService {

  constructor(private dbService: NgxIndexedDBService) { }

  getAllClutch(): Observable<Array<Clutch>> {
    return this.dbService.getAll("clutch");
  }

  addClutch(clutchData: any): Observable<Clutch> {
    return this.dbService
      .add("clutch", {
        honorific: clutchData.honorific,
        expertise: clutchData.expertise,
        quirk: clutchData.quirk,
        dream: clutchData.dream,
        heirloom: clutchData.heirloom,
        goblins: clutchData.goblins
      });
  }

  updateClutch(clutchData: any): Observable<Clutch> {
    return this.dbService
      .update("clutch", {
        id: clutchData.id,
        honorific: clutchData.honorific,
        expertise: clutchData.expertise,
        quirk: clutchData.quirk,
        dream: clutchData.dream,
        heirloom: clutchData.heirloom,
        goblins: clutchData.goblins
      });
  }

  deleteClutch(key: string, id: number): Observable<boolean> {
    return this.dbService.deleteByKey(key, id)
  }
}