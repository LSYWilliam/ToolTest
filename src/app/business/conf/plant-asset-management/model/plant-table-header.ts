import {NetLinkComponent} from "../../../../plugins/component/table/netLink/net-link.component";

export class PlantTableHeader {
    /**设备资产管理平台 table表格的静态数据*/
    private _tableInput: any;
    /**获取设备资产管理平台 table表格的静态数据*/
    get tableInput(): any {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true
                },
                {
                    headerName: 'busiID',
                    field: 'busiId',
                    hide: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '所属企业',
                    field: 'businessName',
                    suppressSorting: true,
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter"
                },
                {
                    headerName: 'businessID',
                    field: 'businessId',
                    hide: true
                },
                {
                    headerName: '序列号',
                    field: 'apSN',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '型号说明',
                    field: 'apModelDescription',
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRenderer:res=> {
                        return res.value?`<span title='${res.value}'>${res.value}</span>`:``;
                    }
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '设备状态',
                    field: 'apBelong',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true
                },
                {
                    headerName: '申购时间',
                    field: 'factoryTime',
                    suppressMenu:true
                },
                {
                    headerName: '备注(双击编辑)',
                    field: 'remark',
                    cellRendererFramework: NetLinkComponent,
                    suppressMenu: true,
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true,
                    suppressSizeToFit:true
                }
            ],
            rightMenu : true,
            paginationBool: true,
            sizeEveryPage: 14,
            tableRowHeight: 35,
        };
        return this._tableInput;
    }
}
