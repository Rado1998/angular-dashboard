import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
    declarations: [],
    imports: [CommonModule,NgxEchartsModule,ClickOutsideModule,NgxDatatableModule],
    exports: [CommonModule,NgxEchartsModule,ClickOutsideModule,NgxDatatableModule]
})
export class SharedModule {

}