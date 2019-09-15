export class WorkOrderInfoModel {
    private _tableData: Array<WorkOrderInfoModelItem>;

    get tableData(): Array<WorkOrderInfoModelItem> {
        return this._tableData;
    }

    set tableData(value: Array<WorkOrderInfoModelItem>) {
        this._tableData = value;
    }
}
export class WorkOrderInfoModelItem {
    userMac?;
    userIp?;
    netId?;
    netName?;
    apSn?;
    apId?;
    apName?;
    ssid?;
    inTime?;
    wlanId?;
    authType?;
    userTel?;
}
