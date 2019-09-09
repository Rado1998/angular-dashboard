import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.scss'],
  
})
export class TopNavigationBarComponent implements OnInit, AfterViewInit {
  private _currentTheme: string = '';
  public isAuthorized: boolean = false;
  public showOverlay:boolean = false;
  public navigation:boolean = false;
  constructor(private _themeService:ThemeService) { }

  ngOnInit() {
    this._currentTheme = 'theme-light';
  }

  ngAfterViewInit() {
    // this._setTheme('theme-dark', this._currentTheme);
  }
  navigationDrawer(){
    this.navigation = !this.navigation;
    this.showOverlay = !this.showOverlay;
}
  public onClickChangeTheme(themeName: string) {
    this._setTheme(themeName, this._currentTheme);
  }

  private _setTheme(changeThemeName: string, currentThemeName: string): void {
    let classes = [].slice.call(document.getElementsByClassName(currentThemeName));
    for (let item of classes) {
      item.className = changeThemeName;
    }
    this._currentTheme = changeThemeName;
    this._themeService.currentTheme = changeThemeName;
    this._themeService.changeThemeEvent();
  }
  private _openAddWidgetOverlay(): void {
    setTimeout(() => {
      document.getElementsByClassName("add_widget_overlay")[0].className = "add_widget_overlay show"
    }, 1);
  }
  private _openAvatarWidgetOverlay():void{
    setTimeout(() => {
      document.getElementsByClassName("avatar_overlay")[0].className = "avatar_overlay show"
    }, 1);
  }
  onClickedOutsideWidget(event) {
    document.getElementsByClassName("add_widget_overlay")[0].className = "add_widget_overlay"
  }
  onClickedOutsideAvatar(event){
    document.getElementsByClassName("avatar_overlay")[0].className = "avatar_overlay"
  }
}
