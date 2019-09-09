import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketView } from './market.view';

let marketRoutes: Routes = [
    { path: '', component: MarketView }
]

@NgModule({
    imports: [RouterModule.forChild(marketRoutes)],
    exports: [RouterModule]
})
export class MarketRoutingModule {

}