export class ApRegisterModel {
    private _tableData: Array<ApRegisterItem>;

    get tableData(): Array<ApRegisterItem> {
        return this._tableData;
    }

    set tableData(value: Array<ApRegisterItem>) {
        this._tableData = value;
    }
}
export class ApRegisterItem {
    id?;
    apId?;
    apSn?;
    apName?;
    adapterIp?;
    adapterId?;
}
