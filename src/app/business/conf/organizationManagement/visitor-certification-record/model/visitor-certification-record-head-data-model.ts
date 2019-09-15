import {EditAndDelComponent} from "../../../../../plugins/component/table/editAndDel/edit-and-del.component";
import * as moment from "moment";

export class VisitorCertificationRecordHeadDataModel {
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
                    headerName: '终端mac',
                    field: 'mac',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '手机号',
                    field: 'tel',
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRenderer:res=> {
                        return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                    }
                },
                {
                    headerName: '上线时间',
                    field: 'createTime',
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRenderer: function (params) {
                        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
                    },
                }
                // {
                //     headerName: '归属员工',
                //     field: 'empName',
                //     menuTabs: ["filterMenuTab"],
                //     filter: "agTextColumnFilter",
                //     suppressSorting: true
                // },
                // {
                //     headerName: '归属部门',
                //     field: 'deptNameList',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true
                // },
                // {
                //     headerName: '操作',
                //     field: 'operation',
                //     suppressFilter: true,
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     cellRendererFramework: EditAndDelComponent
                // }
            ],
            paginationBool: true,
            rightMenu: true,
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
