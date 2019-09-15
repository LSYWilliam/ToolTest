import {IconComponent} from "../../../../plugins/component/table/icon/icon.component";
import {NetLinkComponent} from "../../../../plugins/component/table/netLink/net-link.component";


export class StaticDataModel {
    /** 表格头部 */
    private _tableInput: TableInterface;

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: '状态',
                    field: 'status',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true

                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    unSortIcon: true, // 默认显示不排序
                    suppressSorting: true,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSizeToFit:true,
                    cellRendererFramework: NetLinkComponent,
                    // cellRendererFramework: ApLinkComponent
                },
                {
                    headerName: '设备型号',
                    field: 'apModel',
                    suppressSorting: true,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true ,// 默认显示不排序
                    suppressSizeToFit:true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    suppressSorting: true,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true,// 默认显示不排序
                    suppressSizeToFit:true
                },
                {
                    headerName: '本地IP',
                    field: 'localIp',
                    suppressSorting: true,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    unSortIcon: true, // 默认显示不排序
                    suppressSizeToFit:true
                },
                {
                    headerName: '当前在线客户端',
                    field: 'onlineNum',
                    suppressMenu: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: NetLinkComponent,
                    suppressSizeToFit:true
                },
                {
                    headerName: '今日转发流量(MB)',
                    field: 'dayTraffic',
                    suppressMenu: true,
                    unSortIcon: true, // 默认显示不排序
                    suppressSizeToFit:true
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
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
