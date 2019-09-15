export class AdapterGroupManagementModel {
    private _tableData: Array<AdapterGroupManagementItem> = [];

    get tableData(): Array<AdapterGroupManagementItem> {
        return this._tableData;
    }

    set tableData(value: Array<AdapterGroupManagementItem>) {
        this._tableData = value;
    }
}
export class AdapterGroupManagementItem {
    id?;
    adapterGroupName?;
    adapterGroupIp?;
    webPort?;
    udpPort?;
    address?;
    remark?;
    updateTime?;
    createTime?;
}
