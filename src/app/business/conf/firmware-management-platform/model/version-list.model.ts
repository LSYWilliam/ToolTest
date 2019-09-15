import { VersionLinkComponent } from '../../../../plugins/component/table/versionLink/version-link.component';
import { DisabledComponent } from '../../../../plugins/component/table/disabled/disabled.component';
import * as moment from 'moment';

export class VersionListModel {

    /** 版本列表-表格头部 */
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
                    headerName: 'ID',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '版本号',
                    field: 'version',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true
                },
                {
                    headerName: 'MD5',
                    field: 'checkMd5',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true
                },
                {
                    headerName: '设备类型',
                    field: 'typeName',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true
                },
                {
                    headerName: '设备型号',
                    field: 'deviceModel',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true
                },
                {
                    headerName: '版本说明',
                    field: 'instruction',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRendererFramework: VersionLinkComponent
                },
                {
                    headerName: '版本状态',
                    field: 'versionStatusName',
                    unSortIcon: true,
                    suppressMenu: true,
                    suppressSorting: true,
                },
                {
                    headerName: '时间',
                    field: 'createTime',
                    suppressMenu: true,
                    suppressSorting: true,
                    unSortIcon: true,
                    cellRenderer: function(params) {
                        return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
                    },
                },
                {
                    headerName: '操作',
                    field: 'delFlag',
                    unSortIcon: true, // 默认显示不排序
                    suppressMenu: true,
                    suppressSorting: true,
                    cellRendererFramework: DisabledComponent
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


}
