export class StaticDataModel {
    /**设备列表 table表格静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取设备列表 table表格静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: '设备名称',
                    field: 'apName',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit : true
                },
                {
                    headerName: '序列号',
                    field: 'apSN',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressSizeToFit : true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSizeToFit : true
                },
                {
                    headerName: '型号说明',
                    field: 'apModelDescription',
                    suppressMenu: true,
                    suppressSorting: true,
                    width: 350,
                    suppressSizeToFit : true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSizeToFit : true
                },
                {
                    headerName: '申购时间',
                    field: 'factoryTime',
                    suppressMenu: true,
                    suppressSizeToFit : true
                }
            ],
            paginationBool: false,
            // sizeEveryPage: 2,
            tableRowHeight: 35,
            tableStyle: { }
        };
        return this._tableInput;
    }
    /**设置设备列表 table表格静态数据*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
