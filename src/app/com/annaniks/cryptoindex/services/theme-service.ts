import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
@Injectable()
export class ThemeService{
    private _currentTheme:string = "theme-light";
    public footerLogoUrl:string = "assets/footer-navigation-menu/logo.svg"
    public smallLogoUrl:string = "assets/widgets/top/cix_horizontal.svg";
    public currentThemeSubject: Subject<string> = new Subject<string>();

    constructor(){
        this._setLogoColor(this._currentTheme)
    }
    get currentTheme():string {
        return this._currentTheme;
    }
    set currentTheme(theBar:string) {
        this._currentTheme = theBar;
        this._setLogoColor(this._currentTheme)
    }
    private _setLogoColor(currentTheme:string):void{
        currentTheme == "theme-light" || currentTheme == "theme-dull"  ? this.footerLogoUrl = "assets/footer-navigation-menu/logo.svg" : this.footerLogoUrl = "assets/footer-navigation-menu/logo-white.svg" 
        currentTheme == "theme-light" || currentTheme == "theme-dull"  ? this.smallLogoUrl = "assets/widgets/top/cix_horizontal.svg" : this.smallLogoUrl = "assets/widgets/top/cix_horizontal_white.svg"
    }
   
    public changeThemeEvent() {
        this.currentThemeSubject.next(this._currentTheme);
    }
}