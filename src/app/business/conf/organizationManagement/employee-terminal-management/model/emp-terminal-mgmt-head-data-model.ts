import {EditAndDelComponent} from "../../../../../plugins/component/table/editAndDel/edit-and-del.component";

export class EmpTerminalMgmtHeadDataModel {
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
                    headerName: 'MAC地址',
                    field: 'macAddr',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备资产编号',
                    field: 'equipmentNumber',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备类型',
                    field: 'equipmentType',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '归属员工',
                    field: 'empName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                // {
                //     headerName: '归属部门',
                //     field: 'deptNameList',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true
                // },
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
