export class StaticDataModel {
    /**网络搜索数据*/
    private _networkSearchData: any;
    /**AP网络表格字段*/
    private _leftTableInput: TableInterface;
    /**交换机网络表格字段*/
    private _downTableInput: TableInterface;

    get networkSearchData(): any {
        return this._networkSearchData;
    }
    set networkSearchData(value: any) {
        this._networkSearchData = value;
    }
    /**
     * 获取表格的头部方法
     * @return any
     *          返回tableInput，数据类型为json
     */
    get leftTableInput(): TableInterface {
        this._leftTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    suppressSorting: true,
                    suppressFilter: true,
                    width:30,
                    suppressSizeToFit: true
                },
                {
                    headerName: '名称',
                    field: 'apName',
                    width:100,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: '序列号',
                    field: 'apSn',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    width:120,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    width:140,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false ,// 默认显示不排序
                    suppressSizeToFit: true
                }
            ],
            paginationBool: false,
            // sizeEveryPage: 5,
            tableRowHeight: 35,
            tableStyle: {width: 'auto',height:'280px'}
        };
        return this._leftTableInput;
    }

    set leftTableInput(value: TableInterface) {
        this._leftTableInput = value;
    }

    /**
     * 获取表格的头部方法
     * @return any
     *          返回tableInput，数据类型为json
     */
    get downTableInput(): TableInterface {
        this._leftTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    suppressSorting: true,
                    suppressFilter: true,
                    width:30,
                    suppressSizeToFit: true
                },
                {
                    headerName: '名称',
                    field: 'switchName',
                    width:100,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: '序列号',
                    field: 'switchSn',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: '型号',
                    field: 'switchModel',
                    width:120,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false, // 默认显示不排序
                    suppressSizeToFit: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'switchMac',
                    width:140,
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: false ,// 默认显示不排序
                    suppressSizeToFit: true
                }
            ],
            paginationBool: false,
            // sizeEveryPage: 5,
            tableRowHeight: 35,
            tableStyle: {width: 'auto',height:'280px'}
        };
        return this._leftTableInput;
    }

    set downTableInput(value: TableInterface) {
        this._leftTableInput = value;
    }
}
