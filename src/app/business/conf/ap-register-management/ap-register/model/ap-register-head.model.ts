export class ApRegisterHeadModel {
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
                    headerName: '序号',
                    field: 'apId',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '适配器地址',
                    field: 'adapterIp',
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
