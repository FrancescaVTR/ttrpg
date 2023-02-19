import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-goblin-quest',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class GoblinQuestComponent implements OnInit, OnDestroy {

  constructor(private homeService: HomeService) {}
  
  ngOnInit(): void {
    this.homeService.gameSelected$.next("Goblin Quest");
  }
  
  ngOnDestroy(): void {
    this.homeService.gameSelected$.next("TTRPG App");
  }

}
