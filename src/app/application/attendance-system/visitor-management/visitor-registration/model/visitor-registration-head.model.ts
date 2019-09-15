
export class VisitorRegistrationHead {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "id",
            hide:true
        }, {
            field: "visitDate",
            headerName: "到访日期"
        }, {
            field: "visitorName",
            headerName: "访客姓名",
            searchable :true
        }, {
            field: "gender",
            headerName: "访客性别"
        },{
            field: "visitorWorkPlace",
            headerName: "访客所在单位"
        }, {
            field: "visitorTel",
            headerName: "联系方式"
        }, {
            field: "isPrecontract",
            headerName: "是否预约",
            searchable :true
        }, {
            field: "inviter",
            headerName: "被访人",
            searchable :true
        },{
            field: "reasons",
            headerName: "到访事由"
        }, {
            field: "typingDate",
            headerName: "录入日期"
        }, {
            field: "remark",
            headerName: "访客备注"
        }];

        this.metaData = {
            checked: true,
            requestType: "get"
        };
    }
}
