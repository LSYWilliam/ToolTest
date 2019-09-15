
export class WorkShiftManagement {
    public tableInput: any;
    public metaData: any;
    private _aggridTableInput; any;

    constructor() {
        this.tableInput = [{
            field: "id",
            hide: true
        }, {
            field: "flightName",
            headerName: "考勤班次名称",
            searchable :true
        }, {
            field: "flightAmTime",
            headerName: "上班时间"
        }, {
            field: "flightPmTime",
            headerName: "下班时间"
        }, {
            field: "flightLateTime",
            headerName: "严重迟到分钟数"
        }, {
            field: "flightAbsentTime",
            headerName: "矿工分钟数"
        }];

        this.metaData = {
            checked: true,
            requestType: "get"
        };
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
                    headerName: 'id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '考勤班次名称',
                    field: 'flightName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '上班时间',
                    field: 'flightAmTime',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '下班时间',
                    field: 'flightPmTime',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '严重迟到分钟数',
                    field: 'flightLateTime',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true
                },
                {
                    headerName: '矿工分钟数',
                    field: 'flightAbsentTime',
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
