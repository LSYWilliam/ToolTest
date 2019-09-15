export class TableHeader {

    /** Portal 表格头部 */
    private _portalInput: any;
    /** Radius 表格头部 */
    private _radiusInput: any;

    /**
     * 获取表格的头部方法
     * @return
     *      返回tableInput，数据类型为json
     */
    get portalInput(): any {
        this._portalInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    // suppressMenu: true
                },
                {
                    headerName: 'ID',
                    field: 'versionId',
                    hide: true
                },
                {
                    headerName: '名称',
                    field: 'portalName',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: 'IP',
                    field: 'portalIp',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '密钥',
                    field: 'portalShareKey',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '端口',
                    field: 'portalAuthPort',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: 'Portal URL',
                    field: 'portalUrl',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '白名单地址',
                    field: 'view',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRenderer: function(params) {
                        return '<span style="color: #108ee9; text-decoration: underline; cursor: pointer">查看</span>';
                    },
                    // cellStyle: {color: '#108ee9', text-decoration: 'underline', cursor: 'pointer'}
                },
                {
                    headerName: '备注',
                    field: 'remarks',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                }
            ],
            rightMenu : true
            // paginationBool: true,
            // sizeEveryPage: 10,
            // tableRowHeight: 35,
            // tableStyle: {}
        };
        return this._portalInput;
    }

    set portalInput(value: any) {
        this._portalInput = value;
    }

    get radiusInput(): any {
        this._radiusInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true
                },
                {
                    headerName: 'ID',
                    field: 'versionId',
                    hide: true
                },
                {
                    headerName: '名称',
                    field: 'radiusName',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: 'IP',
                    field: 'masterServerIp',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '密钥',
                    field: 'masterServerKey',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '认证端口',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    field: 'masterServerAuthPort',
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '计费端口',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    field: 'masterServerFeePort',
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '备注',
                    field: 'remarks',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                }
            ],
            rightMenu : true
            // paginationBool: true,
            // sizeEveryPage: 10,
            // tableRowHeight: 35,
            // tableStyle: {}
        };
        return this._radiusInput;
    }

    set radiusInput(value: any) {
        this._radiusInput = value;
    }

}
