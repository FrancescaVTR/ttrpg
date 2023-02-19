import { Component, OnInit } from '@angular/core';

import { HomeService } from 'src/app/services/home.service';
import { MenuItem, MENU_ITEMS } from 'src/app/shared/models/home';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {


  menuItems: Array<MenuItem> = MENU_ITEMS;

  constructor(public homeService: HomeService) { }
  
  ngOnInit(): void { }

}
