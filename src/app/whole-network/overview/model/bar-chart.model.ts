/**
 * 全网-监控器-概览 柱状图实体的接口
 * @interface BarChartInterface
 */
export interface BarChartInterface {
    categories: any;
    value: any;
    percent: any;
}

/**
 * 全网-监控器-概览 柱状图的实体
 * @class BarChartModel
 */
export class BarChartModel {
    /** 柱状图的类别 */
    private _categories: any;
    /** 柱状图显示的值 */
    private _value : any;
    /** 柱状图的颜色 */
    private _color: string;
    /** 柱状图的类型 */
    private _type: string;
    /** 柱状图的名称 */
    private _name: string;
    /** 柱状图的单位 */
    private _company: string;

    /**
     * 构造函数
     * @param data BarChartInterface
     *                  接口获取的待处理数据
     * @param type string
     *                  柱状图类型
     */
    constructor(data: BarChartInterface, type:string) {
        this._categories = data.categories;
        this._value = [];

        if (data.value.length > 0) {
            for (let i = 0; i < data.value.length; i++) {
                this._value.push({'y': data.value[i], 'z': data.percent[i]});
            }

            if (type === 'flow') {
                this._color = '#058D99';
                this.name = '今日转发流量';
                this.company = 'GB';
            } else {
                this.color = '#E8B444';
                this.name = '今日在线客户端';
                this.company = '个';
            }
        }
    }

    get company(): string {
        return this._company;
    }

    set company(value: string) {
        this._company = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get categories(): any {
        return this._categories;
    }

    set categories(value: any) {
        this._categories = value;
    }

    get value(): any {
        return this._value;
    }


    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    set value(value: any) {
        this._value = value;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get getOptions(): any {
        return {
            chart: {
                type: 'bar'
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            title: {
                text: ''
            },
            colors: [this.color],
            xAxis: {
                categories: this.categories,
                title: {
                    text: null
                },
                tickLength: 0,
                lineColor: '#ececec',
                labels: {
                    style: {
                        color: '#666666',
                        fontSize: 12,
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false,
                },
                gridLineWidth: 0
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderWidth: 0,
                borderRadius: 5,
                shadow: false,
                style: {
                    color: '#fff'
                },
                headerFormat: '<table>',
                pointFormat: '<tr>' +
                '<td style="padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f}' + this.company + '</b></td>' +
                '<td style="padding:0"><b>（{point.z:f} %）</b></td>' +
                '</tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                    name: this.name,
                    borderRadius: 2,
                    pointWidth:18,
                    data: this.value
                }
            ]
        };
    }
}
