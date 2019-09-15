import * as moment from 'moment';
/**
 * 无线-监控器-AP详情 在线客户端实体
 * @class OnlineClientModel
 */
export class OnlineClientModel {
    /** 在线客户端 */
    clientNum: any;

    /**
     * 构造函数
     * @param data BusinessMonitorChartModel
     *                  接口获取的待处理数据
     */
    constructor(data: OnlineClientModel) {
        this.clientNum = data.clientNum;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */

    get getOptions(): any {
        return {
            chart:{
                type: 'area',
                plotBorderWidth:1,
                plotBorderColor:'rgb(5,142,153)',
                spacing:[1,1,-15,1],
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false
            },
            exporting: {
                enabled: false
            },
            colors: ['rgb(5,142,153)'],
            legend: {
                enabled: false,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'top',
                y: 50,
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%Y-%m-%d',
                    week: '%Y-%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                },
                split: false,
                shared: true,
                valueSuffix: 'MB/s',
                backgroundColor:'#fff',
                borderColor:'#d9d9d9',
                shadow:false,
            },
            xAxis: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%Y-%m-%d',
                    week: '%Y-%m',
                    month: '%Y-%m',
                    year: '%Y'
                },
                gapGridLineWidth: 0,
                lineWidth:0,
                tickWidth:0,
            },
            yAxis:{
                opposite:false,
                labels:{
                    align: 'right',
                },
                gridLineColor:'#e8e7e7'
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                xAxis: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%Y-%m-%d',
                        week: '%Y-%m',
                        month: '%Y-%m',
                        year: '%Y'
                    },
                },
                top: 180,
                height:15,
                outlineColor:'#058e99',
                outlineWidth:1,
                maskFill: 'rgba(0, 0, 0, 0.2)',
                handles:{
                    height:10,
                    width:5,
                    backgroundColor:'#028d98',
                    borderColor:'rgba(0,0,0,0)'
                }
            },
            scrollbar : {
                enabled : false
            },
            plotOptions: {
                series: {
                    dataGrouping: {
                        dateTimeLabelFormats: {
                            millisecond: ['%Y-%m-%d %H:%M:%S.%L', '%Y-%m-%d %H:%M:%S.%L', ' ~ %H:%M:%S.%L'],
                            second: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S', ' ~ %H:%M:%S'],
                            minute: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
                            hour: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
                            day: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
                            week: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
                            month: ['%Y-%m', '%Y-%m', ' ~ %Y-%m'],
                            year: ['%Y', '%Y', ' ~ %Y']
                        }
                    }
                }
            },
            series: [
                {
                    name : '在线客户端',
                    data : this.clientNum,
                    lineColor:"rgb(5,142,153)",
                    fillColor:"rgba(5,142,153,0.4)",
                    lineWidth:1,
                    tooltip: {
                        valueSuffix: '个',
                        valueDecimals: 2
                    },
                    gapSize:0,
                    threshold: null
                }
            ]
        };
    }
}
