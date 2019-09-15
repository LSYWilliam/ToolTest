/**
 * 无线-监控器-AP详情 CPU使用趋势
 * @class UseTrendModel
 */
export class UseTrendModel {
    // x: any;
    // data: any;
    data: any[];

    /**
     * 构造函数
     * @param data UseTrendModel
     *                  接口获取的待处理数据
     */
    constructor(data: any[]) {
        // this.x = data.x;
        // this.data = data.data;
        this.data = data;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get getOptions(): any {
        return {
            chart: {
                type: 'line',
                plotBorderColor:'rgb(5,142,153)',
                plotBorderWidth:1
            },
            colors:['rgb(232,180,68)'],
            title: {
                text: ''
            },
            credits:{
                enabled:false
            },
            exporting:{
                enabled:false
            },
            legend: {
                enabled:false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    // second: '%Y-%m-%d %H:%M:%S',
                    // minute: '%Y-%m-%d %H:%M:%S',
                    // hour: '%Y-%m-%d %H:%M:%S',
                    day: '%Y-%m-%d',
                    // month: '%Y-%m-%d %H:%M:%S',
                    // year: '%Y-%m-%d %H:%M:%S'
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%Y-%m-%d %H:%M:%S.%L',
                    second: '%Y-%m-%d %H:%M:%S',
                    minute: '%Y-%m-%d %H:%M:%S',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m-%d',
                    year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [
                {
                    name: '使用率',
                    lineWidth:1,
                    marker: {
                        enabled: false
                    },
                    data: this.data
                }
            ]
        };
    }
}
