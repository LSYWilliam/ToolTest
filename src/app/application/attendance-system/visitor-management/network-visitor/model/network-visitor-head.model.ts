import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

export class NetworkVisitorHead {
    tableInput: any;
    metaData: any;

    constructor(checkboxData: Array<DropDownsInterface> ) {
        this.tableInput = [{
            field: "accountName",
            headerName: "手机号",
            searchable :true,
            cellRenderer:res=> {
                return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
            }
        }, {
            field: "accessType",
            headerName: "认证方式",
            chosenSearchable :true,
            checkboxData :checkboxData,
        }, {
            field: "userMac",
            headerName: "终端MAC地址"
        }, {
            field: "userIp",
            headerName: "登入IP"
        },{
            field: "apIp",
            headerName: "所属AP的IP"
        }, {
            field: "apSerialNum",
            headerName: "所属AP的序列号"
        }, {
            field: "netWorkName",
            headerName: "所属网段名称（SSID）"
        }, {
            field: "lastTime",
            headerName: "最近认证"
        },{
            field: "firstTime",
            headerName: "首次认证"
        }, {
            field: "time",
            headerName: "认证次数"
        }, {
            field: "status",
            headerName: "状态"
        }];

        this.metaData = {
            checked: false,
            requestType: "get"
        };
    }
}
