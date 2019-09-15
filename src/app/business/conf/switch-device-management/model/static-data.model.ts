
export class StaticDataModel {
    /**设备资产管理平台 table表格的静态数据*/
    private _tableInput: any;
    /**获取设备资产管理平台 table表格的静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true
                },
                {
                    headerName: '所属企业',
                    field: 'businessName',
                    hide: true
                },
                {
                    headerName: 'businessID',
                    field: 'businessId',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'apStatus',
                    hide: true
                },
                {
                    headerName: '设备名称',
                    field: 'switchName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '所属企业',
                    field: 'businessName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '序列号',
                    field: 'switchSn',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '型号',
                    field: 'switchModel',
                },
                {
                    headerName: '型号说明',
                    field: 'switchModelDescription',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'switchMac',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '设备状态',
                    field: 'switchBelong',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '申购时间',
                    field: 'factoryTime',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
            ],
            rightMenu : true,
            paginationBool: true,
            sizeEveryPage: 14,
            tableRowHeight: 35
        };
        return this._tableInput;
    }

    /**设置商家表格字段*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
