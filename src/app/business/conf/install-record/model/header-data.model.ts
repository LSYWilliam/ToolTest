export class HeaderDataModel {

    /** 工单表格字段数据 接口 */
    private _installRecordTableInput: TableInterface;

    get installRecordTableInput(): TableInterface {
        this._installRecordTableInput = {
            tableHeaderData: [
                {
                    headerName: 'ID',
                    field: 'id',
                    hide: true
                },
                {
                    headerName: '工单编号',
                    field: 'workNum',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '企业',
                    field: 'enterprise',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '操作时间',
                    field: 'operatingTime',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '设备类型',
                    field: 'deviceType',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '设备型号',
                    field: 'deviceModel',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '设备序列号',
                    field: 'deviceSn',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '安装人',
                    field: 'installer',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '操作类型',
                    field: 'operationType',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                },
                {
                    headerName: '更换后设备序列号',
                    field: 'replaceDeviceSerialSn',
                    // suppressMenu: true,
                    // suppressSorting: true,
                    // unSortIcon: true
                }
            ],
            rightMenu : false,
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableSelection: 'single'
        };
        return this._installRecordTableInput;
    }

    set installRecordTableInput(value: TableInterface) {
        this._installRecordTableInput = value;
    }
}
