import {CommonLinkComponent} from "../../../../../plugins/component/table/commonLink/commonLink.component";
import {IconComponent} from "../../../../../plugins/component/table/icon/icon.component";
import {NetLinkComponent} from "../../../../../plugins/component/table/netLink/net-link.component";

export class StaticDataModel {
    /**商家表格字段数据 接口*/
    private _tableInput: TableInterface;
    /**获取商家表格字段*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: '',
                    field: 'netId',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'apId',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'apSn',
                    hide: true
                },
                {
                    headerName: '',
                    field: 'apStatus',
                    hide: true
                },
                {
                    headerName: '设备状态',
                    field: 'apStatusIcon',
                    cellRendererFramework: IconComponent,
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    cellRendererFramework: NetLinkComponent,
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: '告警时间',
                    field: 'warnTime',
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: '告警内容',
                    field: 'warnContent',
                    suppressMenu:true,
                    suppressSorting: true
                }
            ],
            rightMenu : true,
            paginationBool: false,
            sizeEveryPage: 13,
            tableRowHeight: 35,
            tableSelection: 'single'
        };
        return this._tableInput;
    }
    /**设置商家表格字段*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
