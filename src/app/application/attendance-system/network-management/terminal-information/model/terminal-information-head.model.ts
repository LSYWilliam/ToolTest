
export class NetworkVisitorHead {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "MAC",
            headerName: "MAC"
        }, {
            field: "IP",
            headerName: "IP"
        }, {
            field: "APIP",
            headerName: "所属AP的IP"
        }, {
            field: "APseries",
            headerName: "所属AP的序列号"
        }, {
            field: "SSID",
            headerName: "所属网段名称（SSID）"
        }];

        this.metaData = {
            checked: false,
            requestType: "get"
        };
    }
}
