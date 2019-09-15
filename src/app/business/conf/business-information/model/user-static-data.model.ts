export class UserStaticDataModel {
    /**用户信息列表 table表格静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取用户信息列表 table表格静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: '用户名',
                    field: 'username',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit : true
                },
                {
                    headerName: '邮箱',
                    field: 'contactEmail',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '角色',
                    field: 'rolesStr',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '创建时间',
                    field: 'createTime',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
            ],
            paginationBool: false,
            // sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }
    /**设置用户信息列表 table表格静态数据*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
