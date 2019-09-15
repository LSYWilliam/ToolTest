export class LogManagementModel {
    private _tableData: Array<LogManagementModelItem>;

    get tableData(): Array<LogManagementModelItem> {
        return this._tableData;
    }

    set tableData(value: Array<LogManagementModelItem>) {
        this._tableData = value;
    }
}
export class LogManagementModelItem {
    id?;
    netId?;
    netName?;
    step?;
    flag?;
    host1?;
    port1?;
    host2?;
    port2?;
    host3?;
    port3?;
}
