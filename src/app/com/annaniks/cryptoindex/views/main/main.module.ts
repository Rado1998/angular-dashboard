import { ThemeService } from './../../services/theme-service';
    import { NgModule } from '@angular/core';
import { MainView } from './main.view';
import { MainRoutingModule } from './main.routing.module';
import {
    SideNavigationMenuComponent,
    TopNavigationBarComponent,
    FooterNavigationBarComponent
} from '../../components';
import { SharedModule } from '../../shared/shared.module';
import {
    MenuItemsService,
    ApiService
} from 'src/app/com/annaniks/cryptoindex/services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        MainView,
        SideNavigationMenuComponent,
        TopNavigationBarComponent,
        FooterNavigationBarComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        HttpClientModule,
    ],
    providers: [
        MenuItemsService,
        ApiService,
        ThemeService
    ]
})
export class MainModule { }