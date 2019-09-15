import * as moment from 'moment';

export class UserTerminalModel {

    /** 事件日志表格头部 */
    private _tableInput: TableInterface;

    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'AP序列号',
                    field: 'apsn',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '时间',
                    field: 'logTime',
                    cellRenderer: function(params) {
                        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
                    },
                    unSortIcon: true,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '设备名',
                    field: 'apName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '事件类型(未转义)',
                    field: 'type',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '事件类型',
                    field: 'logTypeDes',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    unSortIcon: true,// 默认显示不排序
                    suppressSizeToFit:true
                }
            ],
            paginationBool: true,
            sizeEveryPage: 5,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }

}
