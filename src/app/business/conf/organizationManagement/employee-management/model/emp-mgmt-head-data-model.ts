import {EditAndDelComponent} from "../../../../../plugins/component/table/editAndDel/edit-and-del.component";

export class EmpMgmtHeadDataModel {
    /**table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取table表格 静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    rowSelection: "multiple"
                },
                {
                    headerName: 'id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '所属部门',
                    field: 'deptNameList',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '员工姓名',
                    field: 'empName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '员工工号',
                    field: 'jobNumber',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '性别',
                    field: 'empSex',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '职务',
                    field: 'empPosition',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressFilter:true
                },
                {
                    headerName: '电话',
                    field: 'empMobile',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressFilter:true,
                    cellRenderer:res=> {
                        return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                    }
                },
                {
                    headerName: '邮箱',
                    field: 'empEmail',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressFilter:true
                },
                {
                    headerName: '操作',
                    field: 'operation',
                    suppressFilter:true,
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRendererFramework: EditAndDelComponent
                }
            ],
            paginationBool: true,
            rightMenu : true,
            sizeEveryPage: 13,
            tableRowHeight: 35
        };
        return this._tableInput;
    }
    /**设置table表格 静态数据*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
