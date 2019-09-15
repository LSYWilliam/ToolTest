
export class OnlineUsersHead {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "userMac",
            headerName: "用户MAC"
        }, {
            field: "startTime",
            headerName: "上班时间"
        }, {
            field: "ssid",
            headerName: "无线信号"
        }, {
            field: "serialNumber",
            headerName: "序列号"
        },{
            field: "usrName",
            headerName: "用户名"
        }, {
            field: "userTel",
            headerName: "用户手机",
            cellRenderer:res=> {
                return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
            }
        }, {
            field: "partName",
            headerName: "所在部门"
        }];

        this.metaData = {
            checked: false
        };
    }
}
