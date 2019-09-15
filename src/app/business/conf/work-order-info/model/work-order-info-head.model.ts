import {UserOfflineComponent} from "../../../../plugins/component/table/userOffline/user-offline.component";
import * as moment from "moment";

export class WorkOrderInfoHeadModel {
    private _tableInput: TableInterface;

    constructor(flag: boolean) {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: '终端mac',
                    field: 'userMac',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },{
                    headerName: '手机号',
                    field: 'userTel',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true,
                    cellRenderer:res=> {
                        return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                    }
                },
                {
                    headerName: 'IP地址',
                    field: 'userIp',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '上线时间',
                    field: 'inTime',
                    unSortIcon: true, // 默认显示不排序,
                    suppressSorting: true,
                    suppressSizeToFit: true,
                    suppressMenu: true,
                    cellRenderer:res=> {
                        return moment(res.value).format("YYYY-MM-DD HH:mm:ss");
                    }
                },
                {
                    headerName: '网络',
                    field: 'netName',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: 'SSID名称',
                    field: 'ssid',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: 'AP设备名',
                    field: 'apName',
                    unSortIcon: true, // 默认显示不排序,
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: 'AP序列号',
                    field: 'apSn',
                    unSortIcon: true, // 默认显示不排序,
                    suppressSorting: true,
                    suppressSizeToFit: true,
                    suppressMenu: true,
                },
                {
                    headerName: '操作',
                    field: 'operate',
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: UserOfflineComponent,
                    suppressSorting: true,
                    suppressSizeToFit: true,
                    hide: flag,
                }
            ],
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
    }

    get tableInput(): TableInterface {
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
