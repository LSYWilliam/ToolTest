export class OnlineClientManagementModel {
    private _tableData: Array<OnlineClientManagementItem>;

    get tableData(): Array<OnlineClientManagementItem> {
        return this._tableData;
    }

    set tableData(value: Array<OnlineClientManagementItem>) {
        this._tableData = value;
    }
}
class OnlineClientManagementItem {
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
