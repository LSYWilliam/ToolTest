import * as moment from 'moment';

export class UpdateRecordModel {

    /** 固件管理列表头部 */
    private _tableInput: any;

    /**
     * 获取表格的头部方法
     * @return
     *      返回tableInput，数据类型为json
     */
    get tableInput(): any {
        this._tableInput = {
            tableHeaderData: [
                // {
                //     headerName: '历史记录ID',
                //     field: 'id',
                //     hide: true
                // },
                // {
                //     headerName: '更新描述',
                //     field: 'description',
                //     unSortIcon: true // 默认显示不排序
                // },
                {
                    headerName: '更新时间',
                    field: 'updateTime',
                    unSortIcon: true, // 默认显示不排序
                    cellRenderer:  function(params) {
                        return moment(params.value).format('YYYY-MM-DD');
                    }
                },
                // {
                //     headerName: '当前版本ID',
                //     field: 'currentVersionInfoID',
                //     hide: true
                // },
                {
                    headerName: '当前版本',
                    field: 'currentVersion',
                    unSortIcon: true // 默认显示不排序
                },
                // {
                //     headerName: '当前版本介绍',
                //     field: 'currentInstruction',
                //     unSortIcon: true // 默认显示不排序
                // },
                // {
                //     headerName: '当前版本类型',
                //     field: 'currentTypeName',
                //     unSortIcon: true // 默认显示不排序
                // },
                // {
                //     headerName: '当前版本时间',
                //     field: 'currentCreateTime',
                //     unSortIcon: true, // 默认显示不排序
                //     cellRenderer:  function(params) {
                //         return moment(params.value).format('YYYY-MM-DD');
                //     }
                // },
                // {
                //     headerName: '旧版本ID',
                //     field: 'oldVersionInfoID',
                //     hide: true
                // },
                {
                    headerName: '旧版本',
                    field: 'oldVersion',
                    unSortIcon: true // 默认显示不排序
                },
                // {
                //     headerName: '旧版本介绍',
                //     field: 'oldInstruction',
                //     unSortIcon: true // 默认显示不排序
                // },
                // {
                //     headerName: '旧版本类型',
                //     field: 'oldTypeName',
                //     unSortIcon: true // 默认显示不排序
                // },
                // {
                //     headerName: '旧版本时间',
                //     field: 'oldCreateTime',
                //     unSortIcon: true, // 默认显示不排序
                //     cellRenderer:  function(params) {
                //         return moment(params.value).format('YYYY-MM-DD');
                //     }
                // },
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
