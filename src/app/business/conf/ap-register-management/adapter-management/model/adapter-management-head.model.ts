
export class AdapterManagementHeadModel {
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
                    headerName: '适配器名称',
                    field: 'adapterName',
                    suppressMenu: true,
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
                    headerName: 'AP注册端口',
                    field: 'port',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '交换机注册端口',
                    field: 'port2',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备数',
                    field: 'apCount',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '适配器组',
                    field: 'adapterGroupName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '备注',
                    field: 'remark',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressFilter:true
                },
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
