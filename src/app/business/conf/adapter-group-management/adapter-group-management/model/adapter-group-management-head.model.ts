
export class AdapterGroupManagementHeadModel {
    /**用户table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取用户table表格 静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressSorting: true,
                    suppressMenu: true,
                    suppressResize: true,
                    suppressMovable: true,
                    rowSelection: "multiple"
                },
                {
                    headerName: 'id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '适配器组名称',
                    field: 'adapterGroupName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '适配器组ip',
                    field: 'adapterGroupIp',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: 'web端口',
                    field: 'webPort',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: 'udp端口',
                    field: 'udpPort',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '详细地址',
                    field: 'address',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                }
            ],
            paginationBool: true,
            rightMenu : false,
            sizeEveryPage: 13,
            tableRowHeight: 35
        };
        return this._tableInput;
    }
    /**设置用户table表格 静态数据*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
