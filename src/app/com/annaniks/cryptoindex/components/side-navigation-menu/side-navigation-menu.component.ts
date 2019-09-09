import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from '../../services';

@Component({
  selector: 'side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {
  public _overviews: Array<object> = [
    {
      title: "Market Overview",
      subtitle: "Watch updated crypto prices, market caps, volumes.",
    },
    {
      title: "Global Market Chart",
      subtitle: "Watch updated crypto prices, market caps, volumes.",
    },
    {
      title: "Recently Added",
      subtitle: "  Watch updated crypto prices, market caps, volumes.",
    },
    {
      title: "Top Gainers",
      subtitle: "Watch updated crypto prices, market caps, volumes.",
    },
    {
      title: "Top Losers",
      subtitle: "Watch updated crypto prices, market caps, volumes.",
    },
  ]
  constructor(public menuItemsService: MenuItemsService) { }

  ngOnInit() {
    // this._offsetHeight = document.getElementsByClassName('full_content')[0].scrollHeight.toString();
    // this._offsetHeight+="px";
    // console.log('====================================');
    // console.log(document.getElementsByClassName('full_content')[0].scrollHeight);
    // console.log('====================================');
  }

}
