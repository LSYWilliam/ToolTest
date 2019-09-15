import {Component, OnInit, Input, OnChanges, SimpleChanges, Inject} from '@angular/core';
import {ColumnChartsModel} from "./model/columnCharts.model";
import {ColumnChartModel} from "../../model/column-chart.model";

declare let require: any;
let Highcharts = require('highcharts');

/** 在 Highcharts 加载之后加载功能模块*/
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/drilldown')(Highcharts);


/**
 * highcharts
 * @class ColumnchartsComponent
 */

@Component({
    selector: 'app-columncharts',
    templateUrl: './columncharts.component.html',
    styleUrls: ['./columncharts.component.scss']
})

export class ColumnchartsComponent implements OnInit, OnChanges {

    /**转发流量*/
    private chart: any;
    @Input() public chartInput: ColumnChartsModel;
    constructor() {

    }
    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['chartInput'];
        if (change.currentValue && change.currentValue.chartOption == null) {
            this.chartInput.chartOption = {
                credits: { enabled: false},
                exporting: { enabled: false },
                title: {
                    text: '暂无数据',
                    verticalAlign: 'middle',
                    style: {'fontSize': '18px', 'color': '#666666'}
                }
            };
        } else {
            if (this.chart) {
                this.chart.destroy();
            }
           if (this.chartInput) {
               let options = new ColumnChartModel(this.chartInput.chartOption);
               this.chart = Highcharts.chart('container',options.getOptions);
           }
        }
    }

    ngOnInit() {

    }

}

