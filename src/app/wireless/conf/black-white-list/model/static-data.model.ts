export class StaticDataModel {
    /**黑白名单列表表格接口*/
    private _blackWhiteListTableInput: TableInterface;
    /**获取黑白名单列表字段数据*/
    get blackWhiteListTableInput(): TableInterface {

        this.blackWhiteListTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    suppressFilter: true,
                    suppressSizeToFit:true,
                    width:100
                },
                {
                    headerName: 'MAC地址',
                    field: 'mac',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit:true

                },
                {
                    headerName: '备注',
                    field: 'note',
                    suppressFilter: true,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                }
            ],
            paginationBool: true,
            // sizeEveryPage: 10,
            tableRowHeight: 35,
            // tableStyle: {height: '800px'},
            rightMenu : true
        };
        return this._blackWhiteListTableInput;
    }
    /**设置黑白名单列表字段数据*/
    set blackWhiteListTableInput(value: TableInterface) {
        this._blackWhiteListTableInput = value;
    }
}
