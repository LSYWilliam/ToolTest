import { IconComponent } from '../../../plugins/component/table/icon/icon.component';
import { NetLinkComponent } from '../../../plugins/component/table/netLink/net-link.component';

export class NetworkListModel {

    /** 总览网络提示词 */
    private _networkOverview: string;
    /** 关注网络提示词 */
    private _focusWeb: string;
    /** 网络列表提示词 */
    private _netList: string;
    /** 表格头部 */
    private _tableInput: TableInterface;

    get networkOverview(): string {
        return this._networkOverview;
    }

    set networkOverview(value: string) {
        this._networkOverview = value;
    }

    get focusWeb(): string {
        return this._focusWeb;
    }

    set focusWeb(value: string) {
        this._focusWeb = value;
    }

    get netList(): string {
        return this._netList;
    }

    set netList(value: string) {
        this._netList = value;
    }

    /**
     * 获取HighCharts的Options方法
     * @return any
     *          返回highCharts的options，数据类型为object
     */
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'netId',
                    field: 'netId',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '网络Type',
                    field: 'netStatus',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '网络状态',
                    field: 'netStatusIcon',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true,
                    width:100
                },
                {
                    headerName: '网络名称',
                    field: 'netName',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: NetLinkComponent,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '在用设备',
                    field: 'onlineDevice',
                    unSortIcon: true, // 默认显示不排序,
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '离线设备',
                    field: 'offlineDevice',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '当前在线客户端',
                    field: 'currentClient',
                    cellRendererFramework: NetLinkComponent,
                    unSortIcon: true,// 默认显示不排序
                    suppressMenu: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '上行流量（GB）',
                    field: 'dayUpTraffic',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '下行流量（GB）',
                    field: 'dayDownTraffic',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '总流量（GB）',
                    field: 'dayTraffic',
                    hide: true,
                    suppressSizeToFit:true
                },
                {
                    headerName: '今日概要',
                    field: 'todayProfile',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
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
