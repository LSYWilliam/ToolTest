
export class OnlineVisitorsModel {
    chartOption: any;

    constructor(xList,yList) {
        this.chartOption = {
            chart: {
                type: 'areaspline',
                plotBorderWidth:1,
                plotBorderColor:'rgb(5,142,153)',
                spacing:[10,10,10,10],
            },
            title: {
                text:null
            },
            colors: ['rgb(5,142,153)'],
            legend: {
                enabled:false
            },
            xAxis: {
                categories: xList,
                gapGridLineWidth: 0,
                lineWidth:0,
                tickWidth:0,
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            tooltip: {
                shared: true,
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        '在线访客总量: ' + this.y;
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                data: yList,
                lineColor:"rgb(5,142,153)",
                fillColor:"rgba(5,142,153,0.4)",
                lineWidth:1,
                gapSize:0,
                threshold: null
            }]
        };
    }

    get getOptions(): any {
        return this.chartOption;
    }
}
