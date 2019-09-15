export interface SwitchModalInterface {
    /**交换机id*/
    switchId: any;
    /**交换机名称*/
    switchName: any;
    /**企业id*/
    businessId: number;
    /**企业名称*/
    businessName:any;
    /**设备状态*/
    switchStatus: any;
    /**交换机序列号*/
    switchSn: any;
    /**交换机型号*/
    switchModel: any;
    /**交换机型号描述*/
    switchModelDescription: any;
    /**Mac地址*/
    switchMac: any;
    /**申购时间*/
    factoryTime: any;
    /**本地Ip*/
    localIp: any;
    // /**接口状态*/
    // interfaceStatus: any;
}

export class SwitchModalModel {
    /**交换机id*/
    private _switchId: any;
    /**交换机名称*/
    private _switchName: any;
    /**企业id*/
    private _businessId: number;
    /**企业名称*/
    private _businessName:any;
    /**设备状态*/
    private _switchStatus: any;
    /**交换机序列号*/
    private _switchSn: any;
    /**交换机型号*/
    private _switchModel: any;
    /**交换机型号描述*/
    private _switchModelDescription: any;
    /**Mac地址*/
    private _switchMac: any;
    /**申购时间*/
    private _factoryTime: any;
    /**本地Ip*/
    private _localIp: any;

    /**constructor构造函数
     *      1. 设置默认值
     * */
    constructor() {
        this.switchId = null;
        this.switchName = '';
        this.businessId = null;
        this.businessName = '';
        this.switchStatus = null;
        this.switchSn = '';
        this.switchModel = '';
        this.switchModelDescription = '';
        this.switchMac = '';
        this.factoryTime = '';
        this.localIp = '';
    }

    /**设置交换机设备管理数据*/
    public setSwitchDeviceData(data: SwitchModalInterface) {
        console.log(data);
        this.switchId = data.switchId;
        this.switchName = data.switchName;
        this.businessId = data.businessId;
        this.businessName = data.businessName;
        this.switchStatus = data.switchStatus;
        this.switchSn = data.switchSn;
        this.switchModel = data.switchModel;
        this.switchModelDescription = data.switchModelDescription;
        this.switchMac = data.switchMac;
        this.factoryTime = data.factoryTime;
        this.localIp = data.localIp;
    }

    /**获取交换机设备管理数据*/
    public getSwitchDeviceData() {
        return {
            "switchId" : this.switchId,
            "switchName" : this.switchName,
            "businessId" : this.businessId,
            "businessName" : this.businessName,
            "switchStatus" : this.switchStatus,
            "switchSn" : this.switchSn,
            "switchModel" : this.switchModel,
            "switchModelDescription" : this.switchModelDescription,
            "switchMac" : this.switchMac,
            "factoryTime" : this.factoryTime,
            "localIp" : this.localIp
        };
    }

    get switchId(): any {
        return this._switchId;
    }

    set switchId(value: any) {
        this._switchId = value;
    }

    get switchName(): any {
        return this._switchName;
    }

    set switchName(value: any) {
        this._switchName = value;
    }

    get businessId(): number {
        return this._businessId;
    }

    set businessId(value: number) {
        this._businessId = value;
    }

    get businessName(): any {
        return this._businessName;
    }

    set businessName(value: any) {
        this._businessName = value;
    }

    get switchStatus(): any {
        return this._switchStatus;
    }

    set switchStatus(value: any) {
        this._switchStatus = value;
    }

    get switchSn(): any {
        return this._switchSn;
    }

    set switchSn(value: any) {
        this._switchSn = value;
    }

    get switchModel(): any {
        return this._switchModel;
    }

    set switchModel(value: any) {
        this._switchModel = value;
    }

    get switchModelDescription(): any {
        return this._switchModelDescription;
    }

    set switchModelDescription(value: any) {
        this._switchModelDescription = value;
    }

    get switchMac(): any {
        return this._switchMac;
    }

    set switchMac(value: any) {
        this._switchMac = value;
    }

    get factoryTime(): any {
        return this._factoryTime;
    }

    set factoryTime(value: any) {
        this._factoryTime = value;
    }

    get localIp(): any {
        return this._localIp;
    }

    set localIp(value: any) {
        this._localIp = value;
    }
}

/**设置设备资产管理平台table表格 行数据*/
export function setSwitchRowData(rowData: any, updateData: SwitchModalInterface) {
    rowData.switchId = updateData.switchId;
    rowData.switchName = updateData.switchName;
    rowData.businessId = updateData.businessId;
    rowData.businessName = updateData.businessName;
    rowData.switchStatus = updateData.switchStatus;
    rowData.switchSn = updateData.switchSn;
    rowData.switchModel = updateData.switchModel;
    rowData.switchModelDescription = updateData.switchModelDescription;
    rowData.switchMac = updateData.switchMac;
    rowData.factoryTime = updateData.factoryTime;
    rowData.localIp = updateData.localIp;
    return rowData;
}
