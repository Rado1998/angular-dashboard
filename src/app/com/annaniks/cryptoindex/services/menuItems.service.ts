import { Injectable } from '@angular/core';
import { MenuItem } from '../models';

var SIDEMENUITEMS: Array<MenuItem> = [

    {
        label: "Market",
        image: "assets/Side-navigation-menu/market.svg"
    },
    {
        label: "Analysis",
        image: "assets/Side-navigation-menu/analysis.svg"
    },
    {
        label: "Redictions",
        image: "assets/Side-navigation-menu/redictions.svg"
    },
    {
        label: "ICOs",
        image: "assets/Side-navigation-menu/icos.svg"
    }
]

@Injectable()
export class MenuItemsService {

    private _sideMenuItems: Array<MenuItem> = SIDEMENUITEMS;

    public getSideMenuItems(): Array<MenuItem> {
        return this._sideMenuItems;
    }
}