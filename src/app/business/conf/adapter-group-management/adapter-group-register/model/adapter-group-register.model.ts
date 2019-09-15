export class AdapterGroupRegisterModel {
    private _tableData: Array<AdapterGroupRegisterItem>;

    get tableData(): Array<AdapterGroupRegisterItem> {
        return this._tableData;
    }

    set tableData(value: Array<AdapterGroupRegisterItem>) {
        this._tableData = value;
    }
}
export class AdapterGroupRegisterItem {
    id?;
    adapterGroupId?; // 适配器组id
    adapterGroupName?;
    adapterGroupIp?;
    adapterGroupWebPort?;
    adapterGroupUdpPort?;
    adapterGroupAddress?;
    adapterGroupRemark?;
    businessId?; // 企业id
    businessName?;
    businessContact?;
    businessEmail?;
    businessTel?;
    province?;
    city?;
    district?;
    businessAddr?;
    businessremark?;
    creator?;
}
