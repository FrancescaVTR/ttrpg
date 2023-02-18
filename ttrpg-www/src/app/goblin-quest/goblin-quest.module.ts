import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoblinQuestRoutingModule } from './goblin-quest-routing.module';

import { GoblinQuestComponent } from './goblin-quest.component';

@NgModule({
  declarations: [
    GoblinQuestComponent
  ],
  imports: [
    CommonModule,
    GoblinQuestRoutingModule
  ]
})
export class GoblinQuestModule { }
