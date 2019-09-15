import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
import {ProbeConfInterface} from "../../../../shared/component/probe-conf/model/probe-conf-out.model";

export class ProbeConfModel {
    /**网络下拉框数据*/
    private _dropDowns: Array<DropDownsInterface>;
    /**全局探针数据接口*/
    private _confValue: ProbeConfInterface;
    /**AP配置的表格行数据*/
    private _tableData: any;
    private _tableInput: any;

    get tableInput(): any {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 55,
                    minWidth:40,
                    suppressFilter: true,
                    suppressSorting: true,
                    suppressMenu: true,
                    suppressResize: true,
                    suppressMovable: true,
                    rowSelection: "multiple"
                },
                {
                    headerName: 'netId',
                    field: 'netId',
                    hide: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '网络名称',
                    field: 'netName',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '网络探针状态',
                    field: 'probeStatusName',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '探针接受服务器IP',
                    field: 'probeServerIp',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '探针接受服务器端口',
                    field: 'probeServerPort',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '日志服务器IP',
                    field: 'sysLogIp',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '日志服务器端口',
                    field: 'sysLogPort',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '扫频场强',
                    field: 'scanRssi',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '扫频频率(秒)',
                    field: 'probeInterval',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                }
            ],
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }

    set tableInput(value: any) {
        this._tableInput = value;
    }

    /**获取下拉框数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置下拉框数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
    /**获取全局探针数据*/
    get confValue(): ProbeConfInterface {
        return this._confValue;
    }
    /**设置全局探针数据*/
    set confValue(value: ProbeConfInterface) {
        this._confValue = value;
    }
    /**获取表格数据*/
    get tableData(): any {
        return this._tableData;
    }
    /**设置表格数据*/
    set tableData(value: any) {
        this._tableData = value;
    }
}
