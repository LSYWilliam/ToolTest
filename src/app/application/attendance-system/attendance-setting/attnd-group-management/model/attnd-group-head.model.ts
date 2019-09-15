export class AttndGroupHead {
    public tableInput: any;
    private _aggridTableInput; any;

    constructor() {
        this.tableInput=[{
            field:"id",
            headerName:"考勤组Id",
            hide: true
        },{
            field:"groupName",
            headerName:"考勤组名称",
            searchable :true
        },{
            field:"number",
            headerName:"组内人数"
        },{
            field:"groupManagerName",
            headerName:"考勤负责人"
        },{
            field:"kqMethod",
            headerName:"考勤方式"
        }];
    }

    get aggridTableInput() {
        this._aggridTableInput = {
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
                    headerName: '考勤组Id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '考勤组名称',
                    field: 'groupName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '组内人数',
                    field: 'number',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '考勤负责人',
                    field: 'groupManagerName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '考勤方式',
                    field: 'kqMethod',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                }
            ],
            paginationBool: true,
            rightMenu : false,
            sizeEveryPage: 13,
            tableRowHeight: 35
        };
        return this._aggridTableInput;
    }

    set aggridTableInput(value) {
        this._aggridTableInput = value;
    }
}
