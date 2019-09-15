export class StaticDataModel {
    /**table表格接口*/
    private _tableInput: TableInterface;
    /**获取table表字段*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerName: 'APID',
                    field: 'apId',
                    hide: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '是否开启',
                    field: 'probeEnable',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '接收服务器IP地址',
                    field: 'serverIP',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '接收服务器端口',
                    field: 'serverPort',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '发送周期(秒)',
                    field: 'interval',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressSizeToFit: true
                },
                {
                    headerName: '报文格式',
                    field: 'messageType',
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
    /**设置table表字段*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
