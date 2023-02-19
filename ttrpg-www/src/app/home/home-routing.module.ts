import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: "", component: HomeComponent,
    children: [
      {
        path: "goblin-quest",
        loadChildren: () => import("../goblin-quest/goblin-quest.module").then(m => m.GoblinQuestModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
