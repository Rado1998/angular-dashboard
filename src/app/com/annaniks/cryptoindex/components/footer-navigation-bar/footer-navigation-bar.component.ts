import { ThemeService } from './../../services/theme-service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'footer-navigation-bar',
  templateUrl: './footer-navigation-bar.component.html',
  styleUrls: ['./footer-navigation-bar.component.scss']
})
export class FooterNavigationBarComponent implements OnInit {
  public socialIcons:Array<string>=['assets/footer-navigation-menu/telegram.svg','assets/footer-navigation-menu/vk.svg','assets/footer-navigation-menu/in.svg','assets/footer-navigation-menu/fb.svg']
  constructor(private _themeService:ThemeService) { }
  ngOnInit() {    
    this._controlOffset(window.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {   
    this._controlOffset(event.currentTarget.innerWidth)
  }
  private _controlOffset(innerWidth:number):void{
    if(innerWidth > 990){
      document.getElementsByClassName("social_buttons")[0].className = "col-md-3 col-sm-12 offset-2 social_buttons"
   } else{
     document.getElementsByClassName("social_buttons")[0].className = "col-md-3 col-sm-12 social_buttons"
   }
  }
}
