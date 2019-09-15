import { IconComponent } from '../../../plugins/component/table/icon/icon.component';
/**
 * 全网-监控器-概览 静态数据实体
 * @class StaticDataModel
 */
export class StaticDataModel {
    /** 商户信息的提示信息 */
    private _businessTips: string;
    /** 在线网络的提示信息 */
    private _netWorkTips: string;
    /** 设备提示信息 */
    private _deviceTips: string;
    /** 表格字段 */
    private _tableInput: TableInterface;

    get businessTips(): string {
        return this._businessTips;
    }

    set businessTips(value: string) {
        this._businessTips = value;
    }


    get netWorkTips(): string {
        return this._netWorkTips;
    }

    set netWorkTips(value: string) {
        this._netWorkTips = value;
    }

    get deviceTips(): string {
        return this._deviceTips;
    }

    set deviceTips(value: string) {
        this._deviceTips = value;
    }


    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'AP01',
                    field: 'apStatus',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '状态',
                    field: 'apStatusIcon',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true,
                    width:100
                },
                {
                    headerName: 'AP序列号',
                    field: 'apSn',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '设备型号',
                    field: 'apModel',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '今日转发流量(MB)',
                    field: 'apDayTraffic',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                }
            ],
            paginationBool: false,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {
            }
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
