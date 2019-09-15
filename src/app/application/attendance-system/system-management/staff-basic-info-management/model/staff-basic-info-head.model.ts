export class StaffBasicInfoHead {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "usrId",
            hide: true
        }, {
            field: "usrMac",
            hide: true
        }, {
            field: "usrRealName",
            headerName: "真实姓名",
            searchable :true
        }, {
            field: "usrName",
            headerName: "个人账号",
            searchable :true
        }, {
            field: "usrMobile",
            headerName: "手机号码",
            searchable :true,
            cellRenderer:res=> {
                return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
            }
        }, {
            field: "usrPosition",
            headerName: "职位"
        }, {
            field: "partName",
            headerName: "部门"
        }, {
            field: "usrEmail",
            headerName: "邮箱"
        }, {
            field: "usrRegisterTime",
            headerName: "入职时间"
        }, {
            field: "usrWorkStatus",
            headerName: "状态"
        }];

        this.metaData = {
            checked: true
        };
    }
}
