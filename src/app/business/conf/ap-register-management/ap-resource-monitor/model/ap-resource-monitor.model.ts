export class ApResourceMonitorModel {
    private _tableData: Array<ApResourceMonitorItem> = [];

    get tableData(): Array<ApResourceMonitorItem> {
        return this._tableData;
    }

    set tableData(value: Array<ApResourceMonitorItem>) {
        this._tableData = value;
    }
}
export class ApResourceMonitorItem {
    apId?;
    apName?;
    apSn?;
    acIp?;
    acName?;
    belong?;
}
