import * as moment from 'moment';

export class SecurityAlarmModel {

    /** AP安全告警表格头部 */
    private _tableInput: TableInterface;

    /**
     * 获取表格的头部方法
     * @return any
     *          返回tableInput，数据类型为json
     */
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
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRenderer: function(params) {
                        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
                    },
                    unSortIcon: true,
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
                    field: 'typeDesc',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true,
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
