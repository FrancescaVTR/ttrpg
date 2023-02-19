import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoblinQuestRoutingModule } from './goblin-quest-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';

import { GoblinQuestComponent } from './goblin-quest.component';
import { GqNavBarComponent } from './gq-nav-bar/gq-nav-bar.component';
import { GqQuestComponent } from './gq-quest/gq-quest.component';
import { GqClutchComponent } from './gq-clutch/gq-clutch.component';
import { GqRulesComponent } from './gq-rules/gq-rules.component';
import { GqLoreComponent } from './gq-lore/gq-lore.component';

@NgModule({
  declarations: [
    GoblinQuestComponent,
    GqNavBarComponent,
    GqQuestComponent,
    GqClutchComponent,
    GqRulesComponent,
    GqLoreComponent
  ],
  imports: [
    CommonModule,
    GoblinQuestRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class GoblinQuestModule { }
