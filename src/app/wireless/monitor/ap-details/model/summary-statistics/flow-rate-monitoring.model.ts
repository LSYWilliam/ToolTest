import * as moment from "moment";

/**
 * 无线-监控器-AP详情 流速监控实体
 * @class FlowRateMonitoringModel
 */
export class FlowRateMonitoringModel {
    /** 流速监控-上行流速 */
    upFlowVelocity: any;
    /** 流速监控-下行流速 */
    downFlowVelocity: any;
    /** 流速监控-总流速 */
    allFlowVelocity: any;

    /**
     * 构造函数
     * @param data FlowRateMonitoringModel
     *                  接口获取的待处理数据
     */
    constructor(data: FlowRateMonitoringModel) {
        this.upFlowVelocity = data.upFlowVelocity;
        this.downFlowVelocity = data.downFlowVelocity;
        this.allFlowVelocity = data.allFlowVelocity;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get getOptions(): any {
        return {
            chart:{
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
            colors: ['rgb(111,164,61)', 'rgb(232,180,68)', 'rgb(5,142,153)'],
            legend: {
                enabled: true,
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
                    name : '总速率',
                    data : this.allFlowVelocity,
                    tooltip: {
                        valueSuffix: 'Kbps',
                        valueDecimals: 2
                    },
                    gapSize:0,
                    lineWidth:1,
                    threshold: null
                },
                {
                    name : '上行速率',
                    data : this.upFlowVelocity,
                    tooltip: {
                        valueSuffix: 'Kbps',
                        valueDecimals: 2
                    },
                    gapSize:0,
                    lineWidth:1,
                    threshold: null
                },
                {
                    name : '下行速率',
                    data : this.downFlowVelocity,
                    tooltip: {
                        valueSuffix: 'Kbps',
                        valueDecimals: 2
                    },
                    gapSize:0,
                    lineWidth:1,
                    threshold: null
                }
            ]
        };
    }
}
