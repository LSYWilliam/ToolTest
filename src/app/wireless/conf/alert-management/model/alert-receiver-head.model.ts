
export class AlertReceiverHeadModel {

    private _tableInput: TableInterface;

    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    suppressFilter: true,
                    width: 40,
                    suppressMenu:true,
                    suppressSorting:true,
                    suppressSizeToFit: true,
                    suppressColumnVirtualisation: true,
                    suppressResize:true
                },
                {
                    headerName: 'userId',
                    field: 'userId',
                    hide: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '用户名',
                    field: 'username',
                    suppressColumnVirtualisation: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressMovable: true,
                    width: 200
                },
                {
                    headerName: '电话号码',
                    field: 'contactTele',
                    suppressColumnVirtualisation: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressMovable: true,
                    suppressSorting: true,
                    width: 200,
                    cellRenderer:res=> {
                        return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                    }
                },
                {
                    headerName: 'EMail',
                    field: 'contactEmail',
                    suppressColumnVirtualisation: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    suppressMovable: true,
                    width: 200
                },
                {
                    headerName: '用户角色',
                    field: 'rolesStr',
                    suppressColumnVirtualisation: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressMovable: true,
                    suppressSorting: true,
                    width: 200
                }
            ],
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            // tableStyle: {
            //     height: "490px"
            // }
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
