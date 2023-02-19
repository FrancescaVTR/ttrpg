import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoblinQuestComponent } from './goblin-quest.component';
import { GqNavBarComponent } from './gq-nav-bar/gq-nav-bar.component';

const goblinQuestRoutes: Routes = [
  { path: "", component: GoblinQuestComponent,
    children: [
      { path: "", component: GqNavBarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(goblinQuestRoutes)],
  exports: [RouterModule]
})
export class GoblinQuestRoutingModule { }
