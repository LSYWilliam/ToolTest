import { IconComponent } from '../../../../plugins/component/table/icon/icon.component';
import { ApLinkComponent } from '../../../../plugins/component/table/apLink/ap-link.component';
import { UpdateComponent } from "../../../../plugins/component/table/update/update.component";

export class FirmwareListModel {

    /** AP固件管理表格头部 */
    private _tableInput: any;

    /**
     * 获取表格的头部方法
     * @return
     *      返回tableInput，数据类型为json
     */
    get tableInput(): any {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'APID',
                    field: 'apId',
                    hide: true
                },
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备状态',
                    field: 'apStatusIcon',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: ApLinkComponent
                },
                {
                    headerName: '设备型号',
                    field: 'apModel',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '所属网络',
                    field: 'netName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '固件Id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '固件版本号',
                    field: 'version',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '类型',
                    field: 'type',
                    hide: true
                },
                {
                    headerName: '固件更新记录',
                    field: 'updateRecord',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: UpdateComponent
                }
            ],
            paginationBool: true,
            sizeEveryPage: 8,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: any) {
        this._tableInput = value;
    }


}

export class SwitchFirmwareListModel {

    /** AP固件管理表格头部 */
    private _tableInput: any;

    /**
     * 获取表格的头部方法
     * @return
     *      返回tableInput，数据类型为json
     */
    get tableInput(): any {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'SWITCHID',
                    field: 'switchId',
                    hide: true
                },
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu: true,
                    suppressSorting: true
                },
                {
                    headerName: '设备状态',
                    field: 'switchStatusIcon',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: IconComponent
                },
                {
                    headerName: '设备名称',
                    field: 'switchName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    // cellRendererFramework: ApLinkComponent
                },
                {
                    headerName: '设备型号',
                    field: 'switchModel',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '所属网络',
                    field: 'netName',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '固件Id',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '固件版本号',
                    field: 'version',
                    menuTabs: ["filterMenuTab"],
                    filter: "agTextColumnFilter",
                    suppressSorting: true,
                    unSortIcon: true // 默认显示不排序
                },
                {
                    headerName: '类型',
                    field: 'type',
                    hide: true
                },
                {
                    headerName: '固件更新记录',
                    field: 'updateRecord',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true, // 默认显示不排序
                    cellRendererFramework: UpdateComponent
                }
            ],
            paginationBool: true,
            sizeEveryPage: 8,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: any) {
        this._tableInput = value;
    }


}
