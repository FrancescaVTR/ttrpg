import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  games$: Observable<any>;

  constructor(private homeService: HomeService) {
    this.games$ = this.homeService.getHomeSideMenu();
  }

  ngOnInit(): void {
    
  }

}
