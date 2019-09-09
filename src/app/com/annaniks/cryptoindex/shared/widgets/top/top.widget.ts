import { ThemeService } from './../../../services/theme-service';
import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'top-widget',
    templateUrl: 'top.widget.html',
    styleUrls: ['top.widget.scss']
})
export class TopWidget implements OnInit, OnDestroy {
    @Input() public data: Array<object> = [];
    @Input() public widgetLabel: string = 'TOP GAINERS';
    @ViewChild("indexCell") indexCell:TemplateRef<any>;
    @ViewChild("nameCell") nameCell:TemplateRef<any>;
    @ViewChild("percent1") percent1:TemplateRef<any>;
    @ViewChild("percent2") percent2:TemplateRef<any>;
    public rows:any;
    public columns:any;
    constructor(private _themeService:ThemeService) { }

    ngOnInit() { }
    ngAfterViewInit(): void {
   

        setTimeout(() => {
          this.rows = [
            {"#":"1",name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"2", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"3", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"4", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"5", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"1",name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"2", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"3", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"4", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
            {"#":"5", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
          ];
          this.columns = [
            { prop: '#',maxWidth:1,summaryFunc: () => null, cellTemplate: this.indexCell},
            { name: 'NAME',summaryFunc: () => null, cellTemplate: this.nameCell },
            { name: 'C1',summaryFunc: () => null, cellTemplate: this.percent1},
            { name: "C2",summaryFunc: () => null, cellTemplate: this.percent2},
          
          ];
        }, 10);
      }
    ngOnDestroy() { }
}