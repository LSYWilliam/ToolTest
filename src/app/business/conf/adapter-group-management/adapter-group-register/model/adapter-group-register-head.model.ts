export class AdapterGroupRegisterHeadModel {
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
                    headerName: '企业名称',
                    field: 'businessName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
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
