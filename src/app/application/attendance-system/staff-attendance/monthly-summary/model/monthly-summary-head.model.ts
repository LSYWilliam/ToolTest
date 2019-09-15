export class MonthlySummaryHead {
    tableInput: any;
    metaData: any;
    /**aggrid table表格的静态数据*/
    private _agGridTableInput: any;

    constructor(openModal, dayLength?, holiday_flag?, dataChange?,http?) {
        let status = [];
        let length = dayLength ? dayLength : 31;
        // 正常、异常、早退、事假、旷工、
        // 迟到、未打卡、值班、加班、慰唁假、
        // 护理假、产假、婚假、公假、年休、
        // 产检、调休、病假、出差、公出
        let dropDownList=[
            {name:'正常',id:'正常'},{name:'异常',id:'异常'},{name:'早退',id:'早退'},{name:'事假',id:'事假'},{name:'旷工',id:'旷工'},
            {name:'迟到',id:'迟到'},{name:'未打卡',id:'未打卡'},{name:'值班',id:'值班'},{name:'加班',id:'加班'},{name:'慰唁假',id:'慰唁假'},
            {name:'护理假',id:'护理假'},{name:'产假',id:'产假'},{name:'婚假',id:'婚假'},{name:'公假',id:'公假'},{name:'年休',id:'年休'},
            {name:'产检',id:'产检'},{name:'调休',id:'调休'},{name:'病假',id:'病假'},{name:'出差',id:'出差'},{name:'公出',id:'公出'},
            {name:'迟到早退',id:'迟到早退'}];
        for (let i = 1; i <= length; i++) {
            let tmp = {
                style: holiday_flag[i].holidayFlag?"holidayStyle":"",
                field: "status" + i,
                headerName: " ",
                supHeaderName: holiday_flag[i].week,
                subHeaderName:" "+i + "",
                type: "dropDownDisplay",
                dropDownList: dropDownList,
                align: 'center',
                dataChange: dataChange
            };
            status.push(tmp);
        }
        console.log(status);


        this.tableInput = [{
            field: "userId",
            hide: true
        }, {
            field: "usrRealName",
            headerName: "用户名",
            searchable: true
        }, {
            field: "partName",
            headerName: "所在部门",
            searchable: true
        }, {
            field: "userMobile",
            headerName: "用户手机",
            cellRenderer: res => {
                return res.value ? res.value.replace(res.value.substring(3, 9), "******") : "";
            }
        }, {
            field: "onNumber",
            headerName: "出勤天数",
            type: "modalDisplay",
            action: openModal,
            align: 'center'
        }, {
            field: "workTime",
            headerName: "工作时长"
        }, {
            field: "lateNumber",
            headerName: "迟到次数",
            type: "modalDisplay",
            action: openModal,
            align: 'center'
        }, {
            field: "leaveNumber",
            headerName: "早退次数",
            type: "modalDisplay",
            action: openModal,
            align: 'center'
        }, {
            field: "absentNumber",
            headerName: "旷工次数",
            type: "modalDisplay",
            action: openModal,
            align: 'center'
        }, {
            field: "abnormalNumber",
            headerName: "异常考勤天数",
            type: "modalDisplay",
            action: openModal,
            align: 'center'
        }];
        this.tableInput = this.tableInput.concat(status);

        this.metaData = {
            checked: false,
            requestType: "post",
            width: 3000
        };
    }


    /**aggrid table表格的静态数据*/
    get agGridTableInput(): TableInterface {
        this._agGridTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true
                },
                {
                    headerName: '所属企业',
                    field: 'businessName',
                    hide: true
                },
                {
                    headerName: 'businessID',
                    field: 'businessId',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'apStatus',
                    hide: true
                },
                {
                    headerName: '设备名称',
                    field: 'switchName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '所属企业',
                    field: 'businessName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '序列号',
                    field: 'switchSn',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '型号',
                    field: 'switchModel',
                },
                {
                    headerName: '型号说明',
                    field: 'switchModelDescription',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'switchMac',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '设备状态',
                    field: 'switchBelong',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '申购时间',
                    field: 'factoryTime',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
            ],
            rightMenu : true,
            paginationBool: true,
            sizeEveryPage: 14,
            tableRowHeight: 35
        };
        return this._agGridTableInput;
    }

    /**设置商家表格字段*/
    set agGridTableInput(value: TableInterface) {
        this._agGridTableInput = value;
    }
}
