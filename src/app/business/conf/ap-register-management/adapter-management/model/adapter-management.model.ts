export class AdapterManagementModel {
    private _tableData: Array<AdapterManagementItem> = [];

    get tableData(): Array<AdapterManagementItem> {
        return this._tableData;
    }

    set tableData(value: Array<AdapterManagementItem>) {
        this._tableData = value;
    }
}
export class AdapterManagementItem {
    adapterIp?;
    adapterName?;
    apCount?;
    port?;
    port2?;
    remark?;
    id?;
    adapterGroupId?;
}
