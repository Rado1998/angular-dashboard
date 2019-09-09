import { NgModule } from '@angular/core';
import { MarketWidget } from './index';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { TopWidget } from './top/top.widget';
import { PredictionsComponent } from './predictions/predictions.component';
@NgModule({
    declarations: [MarketWidget,TopWidget, PredictionsComponent],
    imports: [CommonModule, SharedModule],
    exports: [MarketWidget,TopWidget,PredictionsComponent],
    providers:[]
})
export class WidgetsModule {

}