import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

let appRoutes: Routes = [
    { path: '', loadChildren: 'src/app/com/annaniks/cryptoindex/views/main/main.module#MainModule' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}