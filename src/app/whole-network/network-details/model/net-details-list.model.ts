import { IconComponent } from '../../../plugins/component/table/icon/icon.component';

export class NetDetailsListModel {

    /** 网络信息提示词 */
    private _netDetailsList: string;
    /** 表格头部 */
    private _tableInput: TableInterface;

    get netDetailsList(): string {
        return this._netDetailsList;
    }

    set netDetailsList(value: string) {
        this._netDetailsList = value;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get tableInput(): TableInterface {
        this.tableInput = {
            tableHeaderData: [
                {
                    headerName: 'APID',
                    field: 'apId',
                    hide: true
                },
                {
                    headerName: '状态类型',
                    field: 'apStatus',
                    hide: true
                },
                {
                    headerName: '状态',
                    field: 'apStatusIcon',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent,
                    suppressSorting: true,
                    suppressMenu: true,
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true
                },
                {
                    headerName: '今日转发流量（MB）',
                    field: 'apDayTraffic',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                }
            ],
            paginationBool: true,
            // sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }

}
