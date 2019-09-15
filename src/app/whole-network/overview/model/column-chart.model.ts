

/**
 * 全网-监控器-概览 可下砖的柱状图实体的接口
 * @interface ColumnChartInterface
 */
export interface ColumnChartInterface {
    value: any;
    drillDownValue: any;
    title: any;
}

/**
 * 全网-监控器-概览 可下砖的柱状图的实体
 * @class ColumnChartModel
 */
export class ColumnChartModel {
    /** 柱状图显示的值 */
    private _value: any;
    /**点击柱状图进入的值*/
    private _drillDownValue: any;
    private _title: any;

    /**
     * 构造函数
     * @param data BarChartInterface
     *                  接口获取的待处理数据
     * @param type string
     *                  柱状图类型
     */
    constructor(data: any) {
        this._value = data.value;
        this._drillDownValue = data.drillDownValue;
        this._title = data.title;
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    get drillDownValue(): any {
        return this._drillDownValue;
    }

    set drillDownValue(value: any) {
        this._drillDownValue = value;
    }

    get title(): any {
        return this._title;
    }

    set title(value: any) {
        this._title = value;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get getOptions(): any {
        return {
            lang:{
                drillUpText:"返回 {series.name}",
            },
            colors: ["#2da0a9", "#ecc165", "#64b11a", "#108ee9", "#e050ff"],
            chart: {
                type: 'column',
                plotBorderWidth: 1,
                plotBorderColor: '#d9dfe5',

            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                gapGridLineWidth: 0,
                lineWidth: 0,
                tickWidth: 0,
            },
            yAxis: {
                title: {
                    text: ''
                },
                gridLineColor: "#d9dfe5"
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}<br/>'
            },
            series: [{
                name: this.title,
                colorByPoint: true,
                data: this.value
            }],
            drilldown: {
                activeAxisLabelStyle: {
                    textDecoration: 'none',
                    color:"#666"
                },
                activeDataLabelStyle: {
                    textDecoration: 'none',
                    color:"#666"
                },
                series: this.drillDownValue,
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 5,
                        x: -5
                    },
                    theme: {
                        fill: 'white',
                        'stroke-width': 1,
                        stroke: 'silver',
                        r: 5,
                        states: {
                            hover: {
                                fill: 'rgb(247,247,247)',
                            },
                            select: {
                                stroke: 'rgb(247,247,247)',
                                fill: 'rgb(247,247,247)'
                            }
                        }
                    }
                }
            }
        }
    }

}
