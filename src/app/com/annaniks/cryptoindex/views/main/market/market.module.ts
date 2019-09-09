import { NgModule } from '@angular/core';
import { MarketRoutingModule } from 'src/app/com/annaniks/cryptoindex/views/main/market/market.routing.module';
import { MarketView } from './market.view';
import { WidgetsModule } from 'src/app/com/annaniks/cryptoindex/shared/widgets/widgets.module';

@NgModule({
    declarations: [MarketView],
    imports: [MarketRoutingModule, WidgetsModule],
})
export class MarketModule { }