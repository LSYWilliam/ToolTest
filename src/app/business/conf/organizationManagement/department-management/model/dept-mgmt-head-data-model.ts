import {EditAndDelComponent} from "../../../../../plugins/component/table/editAndDel/edit-and-del.component";

export class DeptMgmtHeadDataModel {
    /**table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取table表格 静态数据*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 30,
                    suppressFilter: true,
                    rowSelection: "multiple"
                },
                {
                    headerName: 'id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '部门名称',
                    field: 'deptName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '上级部门',
                    field: 'parentName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '部门编号',
                    field: 'deptCode',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '部门人数',
                    field: 'member',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '负责人',
                    field: 'managerName',
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
