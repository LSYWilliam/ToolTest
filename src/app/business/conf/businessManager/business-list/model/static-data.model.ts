import {WorkOrderOperateComponent} from "../../../../../plugins/component/table/workOrderOperate/workOrderOperate.component";


export class StaticDataModel {
    /**商家表格字段数据 接口*/
    private _businessTableInput: TableInterface;
    /**获取商家表格字段*/
    get businessTableInput(): TableInterface {
        this._businessTableInput = {
            tableHeaderData: [
                {
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu:true,
                    suppressSorting:true

                },
                {
                    headerName: '',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'businessId',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'province',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'city',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'district',
                    hide: true
                },
                {
                    headerName: '企业名称',
                    field: 'businessName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '联系人',
                    field: 'businessContact',
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: '电话',
                    field: 'businessTel',
                    suppressMenu:true,
                    suppressSorting: true,
                    cellRenderer:res=> {
                        return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                    }
                },
                {
                    headerName: '地址某某号',
                    field: 'businessAddr',
                    hide: true
                },
                {
                    headerName: '地址',
                    field: 'completeAddress',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    cellRenderer:res=> {
                        return res.value?`<span title='${res.value}'>${res.value}</span>`:``;
                    }
                },
                {
                    headerName: '创建时间',
                    field: 'createTime',
                    suppressMenu:true
                },
                // {
                //     headerName: '网络',
                //     field: 'networkDetails',
                //     cellRendererFramework: WorkOrderOperateComponent,
                //     cellRendererParams: {
                //         data: [{name: '网络详情'}]
                //     }
                // }
            ],
            rightMenu : true,
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableSelection: 'single'
        };
        return this._businessTableInput;
    }
    /**设置商家表格字段*/
    set businessTableInput(value: TableInterface) {
        this._businessTableInput = value;
    }
}
