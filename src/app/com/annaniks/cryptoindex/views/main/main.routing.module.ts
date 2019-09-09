import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainView } from './main.view';

let mainRoutes: Routes = [
    {
        path: '', component: MainView, children: [
            { path: '', redirectTo: 'market', pathMatch: 'full' },
            { path: 'market', loadChildren: 'src/app/com/annaniks/cryptoindex/views/main/market/market.module#MarketModule' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }