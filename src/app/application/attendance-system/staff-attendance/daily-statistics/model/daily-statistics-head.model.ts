
export class DailyStatisticsHeadModel {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "usrRealName",
            headerName: "用户名",
            searchable :true
        }, {
            field: "partName",
            headerName: "所在部门",
            searchable :true
        }, {
            field: "usrMobile",
            headerName: "用户手机",
            cellRenderer:res=> {
                return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
            }
        }, {
            field: "collectFlightsDesc",
            headerName: "班次"
        }, {
            field: "collectDay",
            headerName: "日期"
        },{
            field: "collectDayWeekName",
            headerName: "星期"
        }, {
            field: "collectStatus",
            headerName: "状态"
        }, {
            field: "collectWorkTime",
            headerName: "在线时长"
        }, {
            field: "collectStartTime",
            headerName: "上班打卡时间"
        }, {
            field: "collectStartResult",
            headerName: "上班打卡结果"
        }, {
            field: "collectEndTime",
            headerName: "下班打卡时间"
        }, {
            field: "collectEndResult",
            headerName: "下班打卡结果"
        }];

        this.metaData = {
            checked: false,
            requestType: "post"
        };
    }
}
