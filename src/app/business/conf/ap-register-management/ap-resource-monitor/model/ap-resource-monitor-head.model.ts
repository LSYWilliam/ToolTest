export class ApResourceMonitorHeadModel {
    /**用户table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取用户table表格 静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    width: 10,
                    suppressFilter: true,
                    suppressSorting: true,
                    suppressMenu: true,
                    suppressResize: true,
                    suppressMovable: true,
                    rowSelection: "single"
                },
                {
                    headerName: 'AP名称',
                    field: 'apName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: 'AP序列号',
                    field: 'apSn',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '适配器名称',
                    field: 'acName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '适配器地址',
                    field: 'acIp',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '所属云平台',
                    field: 'belong',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                }
            ],
            paginationBool: true,
            rightMenu : true,
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
