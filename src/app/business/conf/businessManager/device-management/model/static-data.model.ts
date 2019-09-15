export class StaticDataModel {
    /**设备管理表格 静态数据*/
    private _businessListTableInput: TableInterface;
    /**获取设备管理表格 静态数据*/
    get businessListTableInput(): TableInterface {
        this._businessListTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true
                },
                {
                    headerName: 'apId',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '序列号',
                    field: 'apSN',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '型号说明',
                    field: 'apModelDescription',
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRenderer:res=> {
                        return res.value?`<span title='${res.value}'>${res.value}</span>`:``;
                    },
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: 'MAC 地址',
                    field: 'apMac',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '申购时间',
                    field: 'factoryTime',
                    suppressMenu:true,
                    suppressColumnVirtualisation: true
                }
            ],
            paginationBool: true,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._businessListTableInput;
    }
    /**设置设备管理表格 静态数据*/
    set businessListTableInput(value: TableInterface) {
        this._businessListTableInput = value;
    }
}
