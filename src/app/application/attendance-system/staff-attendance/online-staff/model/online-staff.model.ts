
export class OnlineStaffModel {
    option: any;

    constructor(xList,yList) {
        this.option = {
            chart:{
                type: 'column',
                plotBorderWidth:1,
                plotBorderColor:'rgb(5,142,153)',
                spacing:[10, 15, 15, 10],
            },
            title: {
                text: null
            },
            credits:{
                enabled:false
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                max: 10,
                min: 0,
                categories: xList,
                gapGridLineWidth: 0,
                lineWidth:0,
                tickWidth:0,
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {  // 堆叠数据标签
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                    }
                }
            },
            scrollbar: {
                enabled: true
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        '在线员工总量: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        style: {
                            // 如果不需要数据标签阴影，可以将 textOutline 设置为 'none'
                            textOutline: '1px 1px black'
                        }
                    }
                }
            },
            series: [{
                borderWidth:1,
                borderColor:'rgb(5,142,153)',
                color:'rgba(5,142,153,0.2)',
                data: yList,
            }]
        };
    }
}
