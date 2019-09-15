import * as moment from "moment";

/**
 * 无线-监控器-AP详情 AP心跳
 * @class HeartbeatModel
 */
export class HeartbeatModel {
    report: any;
    unreport: any;

    /**
     * 构造函数
     * @param data HeartbeatModel
     *                  接口获取的待处理数据
     */
    constructor(data: HeartbeatModel) {
        this.report = data.report;
        this.unreport = data.unreport;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get getOptions(): any {
        return {
            chart: {
                type: 'scatter',
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false
            },
            exporting:{
                enabled:false
            },
            xAxis: {
                title: {
                    enabled: false,
                },
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
            yAxis: {
                labels:{
                    enabled: false,
                    align: 'right',
                },
                allowDecimals:false,
                min:-1,
                max:1,
                opposite:false,
                title: {
                    enabled: false,
                },
            },
            legend: {
                enabled: true,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'top',
                y: 50,
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        pointFormatter: function() {
                            return '<span style="color: '+ this.series.color + '">\u25CF</span> '+
                                '<b>'+ moment(this.x).format('YYYY-MM-DD HH:mm:ss') +'</b>';
                        }
                    }
                },
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
            scrollbar: {
                enabled:false,
            },
            navigator:{
                top: 165,
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
            rangeSelector : {
                enabled:false,
            },
            series: [
                {
                    name: '心跳上报',
                    color: 'rgb(111,164,61)',
                    data: this.report
                },
                {
                    name: '心跳未上报',
                    color: 'rgb(194,51,51)',
                    data: this.unreport
                }
            ]
        };
    }
}
