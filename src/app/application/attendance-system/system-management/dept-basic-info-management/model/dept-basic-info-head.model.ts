export class DeptBasicInfoHead {
    tableInput: any;
    metaData: any;

    constructor() {
        this.tableInput = [{
            field: "partName",
            headerName: "部门名称"
        }, {
            field: "parentPartName",
            headerName: "上级部门"
        }, {
            field: "partCode",
            headerName: "部门编号"
        }, {
            field: "partLeader",
            headerName: "部门指导"
        }];

        this.metaData = {
            checked: false
        };
    }
}
