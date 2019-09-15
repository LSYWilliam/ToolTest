import { Component, EventEmitter, OnInit, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {HighChartsModel} from './model/highCharts.model';

/**
 * highcharts
 * @class HighchartsComponent
 */

@Component({
    selector: 'app-highcharts',
    templateUrl: './highcharts.component.html',
    styleUrls: ['./highcharts.component.scss']
})

export class HighchartsComponent implements OnInit, OnChanges {

    @Input() public chartInput: HighChartsModel;
    /** 事件 */
    @Output() public eventOption = new EventEmitter();

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['chartInput'];
        if (change.currentValue.chartOption == null) {
            this.chartInput.chartOption = {
                credits: { enabled: false},
                exporting: { enabled: false },
                title: {
                    text: '暂无数据',
                    verticalAlign: 'middle',
                    style: {'fontSize': '18px', 'color': '#666666'}
                }
            };
        }
    }

    clickChart(option) {
        this.eventOption.emit(option);
    }

}

