import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoblinQuestComponent } from './goblin-quest.component';

const goblinQuestRoutes: Routes = [
  { path: "", component: GoblinQuestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(goblinQuestRoutes)],
  exports: [RouterModule]
})
export class GoblinQuestRoutingModule { }
