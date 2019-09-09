import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemeService } from '../../../services/theme-service';

@Component({
  selector: 'predictions-widget',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  public rows:any;
  public columns:any;
  constructor(private _themeService:ThemeService) { }
  @ViewChild("nameCell") nameCell:TemplateRef<any>;
  @ViewChild("c1Cell") c1Cell:TemplateRef<any>;
  @ViewChild("c2Cell") c2Cell:TemplateRef<any>;
  @ViewChild("indexCell") indexCell:TemplateRef<any>;
  ngOnInit() {
  }
  ngAfterViewInit(): void {
   

    setTimeout(() => {
      this.rows = [
        {"#":"1", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"2", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"3", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"4", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"5", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"1", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"2", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"3", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"4", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
        {"#":"5", name: 'Austin', C1: 'Male', C2: 'Swimlane'},
      ];
      this.columns = [
        { prop: '#',maxWidth:1,summaryFunc: () => null, cellTemplate: this.indexCell},
        { name: 'NAME',minWidth:110,summaryFunc: () => null, cellTemplate: this.nameCell },
        { name: 'C1',summaryFunc: () => null, cellTemplate: this.c1Cell},
        { name: "C2",summaryFunc: () => null, cellTemplate: this.c2Cell},
      ];
    }, 10);
  }
}
