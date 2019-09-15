export class StaticDataModel {
    /**table表格接口*/
    private _tableInput: TableInterface;
    /**获取空的table表格*/
    get tableInput(): TableInterface {
        this._tableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressSorting: true,
                    suppressMenu: true,
                    suppressResize: true,
                    suppressMovable: true,
                    rowSelection: "multiple"
                },
                {
                    headerName: 'APID',
                    field: 'apId',
                    hide: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '设备名称',
                    field: 'apName',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '型号',
                    field: 'apModel',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: 'MAC地址',
                    field: 'apMac',
                    filter: "agTextColumnFilter",
                    menuTabs: ["filterMenuTab"],
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '2.4GHz信道',
                    field: 'config2gChannel',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '2.4GHz功率(%)',
                    field: 'config2gPowerDbm',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '5GHz信道',
                    field: 'config5gChannel',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                {
                    headerName: '5GHz功率(%)',
                    field: 'config5gPowerDbm',
                    suppressMenu: true,
                    suppressSorting: true,
                    suppressColumnVirtualisation: true
                },
                // {
                //     headerName: '场强阈值(dBm)',
                //     field: 'rssiThreshold',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressColumnVirtualisation: true
                // },
                // {
                //     headerName: '速率阈值(Mbps)',
                //     field: 'apRateThreshold',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressColumnVirtualisation: true
                // }
            ],
            paginationBool: true,
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {}
        };
        return this._tableInput;
    }
    /**设置空的table表格*/
    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
