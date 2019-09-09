import { ThemeService } from './../../../services/theme-service';
import { ApiService } from './../../../services/api.service';
import { log } from 'util';
import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, AfterViewInit, HostListener, TemplateRef } from '@angular/core';
import { graphic } from 'echarts';
import * as  Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import Tree from 'highcharts/modules/treemap';
import Heatmap from 'highcharts/modules/heatmap';

More(Highcharts);
Tree(Highcharts);
Heatmap(Highcharts);
@Component({
  selector: 'market-widget',
  templateUrl: 'market.widget.html',
  styleUrls: ['market.widget.scss']
})
export class MarketWidget implements OnInit, OnDestroy, AfterViewInit {
  @Input() public widgetMode: string = 'table';
  @Input() public data: Array<object> = [];
  @Input() public colums: Array<object> = [];
  @Input() public widgetLabel: string = 'MARKET OVERVIEW';
  @Input() public index: number = 0;
  @ViewChild("canvas_treemap", { read: ElementRef }) container: ElementRef;
  @ViewChild("marketWidgetContainer") marketWidgetContainer: ElementRef;
  @ViewChild('bitcoinCell') bitcoinCell: TemplateRef<any>;
  @ViewChild("priceCell") priceCell:TemplateRef<any>;
  @ViewChild("supplyCell") supplyCell:TemplateRef<any>;
  @ViewChild("volumeCell") volumeCell:TemplateRef<any>;
  @ViewChild("chartCell") chartCell:TemplateRef<any>;
  @ViewChild("indexCell") indexCell:TemplateRef<any>;

  private _chartInstance  
  private options;
  private _heightOfSmallWidget: string = "745px";
  private _heightOfOtherWidgets: string = "262px";
  private _chartMode:Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  isLoading = false;
  merge:any = {}
  rows
  columns

  values: number[] = [102, 115, 130, 137];
  
 
  
  constructor(private ApiService:ApiService,private _themeService:ThemeService) {
    this.options = {

      backgroundColor: 'transparent',
      tooltip : {
        trigger: 'axis',
        extraCssText:'box-shadow:none;',
        backgroundColor:"transparent",
        formatter : (args) => {
          let tooltip = `<div class="tooltip_container"><div class="tooltip_title"><span>Thursday,Avg 13, 26:44:11 UTC</span></div><div><span>Price </span><span>6,413.40$</span></div></div>`;
          
          return tooltip;
          }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this._chartMode,
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: new graphic.LinearGradient(
                1, 1, 1 - Math.tan(45 * Math.PI / 180), 0,
                [
                  { offset: 0, color: 'rgba(255, 255, 255, 0.03)' },
                  { offset: 0.2, color: 'rgba(255, 255, 255, 0.1)' },
                  { offset: 1, color: 'rgba(255, 255, 255, 0.15)' },
                ]
              ),
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(241,238,255,0.3)",
            }
          },
  
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: new graphic.LinearGradient(
                1, 1, 1 - Math.tan(45 * Math.PI / 180), 0,
                [
                  { offset: 0, color: 'rgba(255, 255, 255, 0.03)' },
                  { offset: 0.2, color: 'rgba(255, 255, 255, 0.1)' },
                  { offset: 1, color: 'rgba(255, 255, 255, 0.15)' },
                ]
              ),
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(241,238,255,0.3)",

            }
          },
          splitNumber: 3,
  
        },
  
      ],
  
      series: [
        {
          name: 'X-1',
          type: 'line',
          stack: 'counts',
          textStyle:{
            fontFamily:"NanumGothic ExtraBold"
          },
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(
                1, 1, 1 - Math.tan(45 * Math.PI / 180), 0,
                [
                  { offset: 0, color: 'rgba(198, 78, 255, 0.096) ' },
                  { offset: 0.25, color: 'rgba(255, 78, 248, 0.15)' },
                  { offset: 0.60, color: 'rgba(196, 57, 255, 0.1)' },
                  { offset: 0.99, color: 'rgba(198, 78, 255, 0.096) ' }
                ]
              )
            },
          },
          data: [120, 132, 101, 134, 90, 230, 250, 124, 300, 50, 247, 84, 95, 150, 200, 250, 170, 120, 132, 101, 134, 90, 230, 250, 124, 300, 50, 247, 84, 95, 150, 200, 250, 170],
          smooth: true,
          itemStyle: {
            color: "#572C90"
          },
  
        },
        {
          name: 'X-2',
          type: 'line',
          stack: 'counts',
          smooth: true,
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(
                1, 1, 1 - Math.tan(90 * Math.PI / 180), 0,
                [
                  { offset: 0.1, color: 'rgba(65, 75, 255, 0.20)' },
                  { offset: 1, color: 'rgba(21, 17, 74, 0)' },
  
                ]
              )
            },
          },
          data: [220, 182, 191, 234, 290, 330, 310, 22, 41, 1, 4, 2, 4, 1, 2, 42],
          itemStyle: {
            color: "#555EF8",
          },
  
        },
  
      ]
    };

   }
  ngOnInit() {
    this._decideHeightOfWidgets(window.innerWidth);
    this._themeService.currentThemeSubject.subscribe((currentTheme:string) =>{
      console.log(currentTheme);
      
      if(currentTheme == "theme-dark" && this.widgetMode == "index" || this.widgetMode == "index-sm"){
          this.options["xAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(21,17,74,0.6)"
          this.options["yAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(21,17,74,0.3)"
          this._chartInstance.setOption(this.options)
      }
      else if(this.widgetMode == "index" || this.widgetMode == "index-sm"){
        this.options["xAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(241,238,255,0.3)"
        this.options["yAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(241,238,255,0.3)"
        this._chartInstance.setOption(this.options)

      }
    });

    // setTimeout(() => {
    //   this.options["xAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(21,17,74,0.6)"
    //   this.options["yAxis"][0]["axisLine"]["lineStyle"]["color"] = "rgba(21,17,74,0.3)"
    // }, 5000);
   
  }
  ngAfterViewInit(): void {
    if(this.widgetMode=="treeMap"){
      this._createTreemap()
    }
    this._setTable()
  }
  className
  private _createTreemap(): void {
    this.className = 'AAAA' + this.index;
    setTimeout(() => {
      if (this.widgetMode == 'treeMap') {
        Highcharts.chart(this.container.nativeElement, {
          chart:{
            margin: [0, 0, 0, 0],
          },
          series: [{
            type: 'treemap',
            layoutAlgorithm: 'strip',
            layoutStartingDirection: 'horizontal',
            backgroundColor:'rgba(255, 255, 255, 0.0)',
            levelIsConstant: false,
            borderColor: "rgba(12, 174, 99, 0.2)",
            data: [{
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 100,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 400,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            },
            {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.5)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(255, 86, 78, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.4)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }, {
              name: 'BTC',
              value: 50,
              color: "rgba(12, 174, 99, 0.2)",
              dataLabels: {
                useHTML: true,
                enabled: true,
                allowHTML: true
              },
              className: this.className
            }]
          }],
          title: {
            text: ''
          }
        })
      }
      this._calculateTreemapPosition()
    

    }, 1);

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._decideHeightOfWidgets(event.target.innerWidth)
    // this._calculateTreemapPosition();
  }
  private _calculateTreemapPosition():void{
    
    if (document.getElementsByClassName('highcharts-data-labels highcharts-series-0 highcharts-treemap-series highcharts-color-0 highcharts-tracker').length > 0 ) {
      let container = [].slice.call(this.container.nativeElement.children[0].children[1].children);

      if (container.length > 0) {          
        container.forEach((element, index) => {
          let width = [].slice.call(document.getElementsByClassName(this.className))[index].width.baseVal.valueInSpecifiedUnits
          
          element.innerHTML =
            '<div class="treemap_item">' +
            '<div class="treemap_inner_left"><span>BTC</span></div>' +
            '<div class="treemap_inner_right"><div><span>+23%</span><img src="/assets/widgets/treeMap/rectangle.svg"/></div><div><span>0.6778899</span></div></div>'
            + '</div>'
            
           element.style.width = width + 'px';
           if (element.style.width) {              
            let widthInNumber = element.style.width.substring(0, element.style.width.length - 2);
            let leftInNumber = element.style.left.substring(0, element.style.left.length - 2);
            let topInNumber = element.style.top.substring(0, element.style.top.length - 2);
            element.style.left = (leftInNumber - widthInNumber / 2 + 15) + 'px';
            element.style.top = (topInNumber - element.offsetHeight / 2 + 10) + 'px'

          }

        })
      }
    }
  }
  public setWidgetMode(widgetMode: string): void {
    if (widgetMode != this.widgetMode) {
      this.widgetMode = widgetMode;
      this._setTable();
      if (widgetMode == 'treeMap') {
        this._createTreemap()
      }
    }
  }
  private _decideHeightOfWidgets(screenSize): void {

    if (screenSize > 990) {
      this._heightOfSmallWidget = "745px"
      this._heightOfOtherWidgets = "265px"
    }
    else {
      this._heightOfSmallWidget = "106px"
      this._heightOfOtherWidgets = "100%"

    }
  }
  private _setChartMode(chartMode,event):void{
    switch (chartMode) {
      case 'week':
        this._chartMode = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        break;
      case 'day':
        this._chartMode = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
        break;
      case 'month':
        this._chartMode = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        break;
      case 'year':
        this._chartMode = ['1990',"2000","2001","2002","2003","2004","2005","2018"];
        break;
      default:
        this._chartMode = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        break;
    }
    document.getElementsByClassName("chart_filter_item active")[0].className="chart_filter_item"
    event.path[1].className += " active"      
    this.options.xAxis[0]["data"] = this._chartMode;
    this._chartInstance.setOption(this.options)
    }
   
   public onChartInit(event){
     this._chartInstance = event;
   }
   
  
   private _setTable():void{
    setTimeout(() => {
      this.rows = [
        {"#":"1",name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"2", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"3", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"4", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"5", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"6", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"1",name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"2", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"3", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"4", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"5", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
        {"#":"6", name: 'Austin', gender: 'Male', company: 'Swimlane',price:"Price",supply:"Supply",marketsCaps:"asd",volume:"sdsdsd",dPrice:"7D PRICE" },
      ];
      this.columns = [
        { prop: '#',maxWidth:1,summaryFunc: () => null, cellTemplate: this.indexCell },
        { name: 'NAME',summaryFunc: () => null, cellTemplate: this.bitcoinCell },
        { name: 'PRICE',summaryFunc: () => null,cellTemplate:this.priceCell },
        { name: "SUPPLY", summaryFunc: () => null,cellTemplate:this.supplyCell},
        { name: "MARKETS CAPS",summaryFunc: () => null,cellTemplate:this.supplyCell},
        { name:"24VOLUME",summaryFunc: () => null,cellTemplate:this.volumeCell},
        { name:"7D PRICE",summaryFunc: () => null,cellTemplate:this.chartCell}
    
      ];
    }, 10);
   }
  ngOnDestroy() { }

}