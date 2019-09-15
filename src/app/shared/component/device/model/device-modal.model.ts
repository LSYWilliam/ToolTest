export interface DeviceModalInterface {
    /**apId*/
    apId: any;
    /**商家Id*/
    businessId: number;
    /**商家名称*/
    businessName:any;
    /**设备名称*/
    apName: any;
    /**序列号*/
    apSN: any;
    /**型号*/
    apModel: any;
    /**型号说明*/
    apModelDescription: any;
    /**Mac地址*/
    apMac: any;
    /**申购时间*/
    factoryTime: any;
    /**是否申购*/
    apBelong: any;
    /**备注*/
    remark: any;
}

export class DeviceModalModel {
    /**apId*/
    private _apId: any;
    /**商家Id*/
    private _businessId: number;
    /**商家名称*/
    private _busiName:any;
    /**设备名称*/
    private _apName: any;
    /**序列号*/
    private _apSN: any;
    /**型号*/
    private _apModel: any;
    /**型号说明*/
    private _apModelDescription: any;
    /**Mac地址*/
    private _apMac: any;
    /**申购时间*/
    private _factoryTime: any;
    /**是否申购*/
    private _apBelong: any;
    /**备注*/
    private _remark: any;
    /**constructor构造函数
     *      1. 设置默认值
     * */
    constructor() {
        this.apId = null;
        this.businessId = null;
        this.busiName = '';
        this.apName = '';
        this.apSN = '';
        this.apModel = '';
        this.apModelDescription = '';
        this.apMac = '';
        this.factoryTime = '';
        this.apBelong = '';
        this.remark = '';
    }
    /**设置设备管理模态框数据*/
    public setDeviceData(data: DeviceModalInterface) {
        this.apId = data.apId;
        this.businessId = data.businessId;
        this.busiName = data.businessName;
        this.apName = data.apName;
        this.apSN = data.apSN;
        this.apModel = data.apModel;
        this.apModelDescription = data.apModelDescription;
        this.apMac = data.apMac;
        this.factoryTime = data.factoryTime;
        this.remark = data.remark;
    }
    /**获取设备管理模态框数据*/
    public getDeviceData() {
        return {
            "apId" : this.apId,
            "businessId" : this.businessId,
            "apName" : this.apName,
            "apSN" : this.apSN,
            "apModel" : this.apModel,
            "apMac" : this.apMac,
            "factoryTime" : this.factoryTime,
            "remark" : this.remark,
        };
    }
    /**设置设备资产管理平台模态框数据*/
    public setPlatFormData(data: DeviceModalInterface) {
        this.apId = data.apId;
        this.businessId = data.businessId;
        this.busiName = data.businessName;
        this.apName = data.apName;
        this.apSN = data.apSN;
        this.apModel = data.apModel;
        this.apModelDescription = data.apModelDescription;
        this.apMac = data.apMac;
        this.factoryTime = data.factoryTime;
        this.apBelong = data.apBelong;
        this.remark = data.remark;
    }
    /**获取设备资产管理平台模态框数据*/
    public getPlatFormData() {
        return {
            "apId" : this.apId,
            "businessId" : this.businessId,
            "businessName" : this.busiName,
            "apName" : this.apName,
            "apSN" : this.apSN,
            "apModel" : this.apModel,
            "apModelDescription" : this.apModelDescription,
            "apMac" : this.apMac,
            "factoryTime" : this.factoryTime,
            "apBelong" : this.apBelong,
            "remark" : this.remark
        };
    }
    /**获取apId*/
    get apId(): number {
        return this._apId;
    }
    /**设置apId*/
    set apId(value: number) {
        this._apId = value;
    }
    /**获取商家Id*/
    get businessId(): number {
        return this._businessId;
    }
    /**设置商家Id*/
    set businessId(value: number) {
        this._businessId = value;
    }
    /**获取商家名称*/
    get busiName(): any {
        return this._busiName;
    }
    /**设置商家名称*/
    set busiName(value: any) {
        this._busiName = value;
    }
    /**获取ap名称*/
    get apName(): any {
        return this._apName;
    }
    /**设置ap名称*/
    set apName(value: any) {
        this._apName = value;
    }
    /**获取ap序列号*/
    get apSN(): any {
        return this._apSN;
    }
    /**设置ap序列号*/
    set apSN(value: any) {
        this._apSN = value;
    }
    /**获取ap型号*/
    get apModel(): any {
        return this._apModel;
    }
    /**设置ap型号*/
    set apModel(value: any) {
        this._apModel = value;
    }
    /**获取ap型号说明*/
    get apModelDescription(): any {
        return this._apModelDescription;
    }
    /**设置ap型号说明*/
    set apModelDescription(value: any) {
        this._apModelDescription = value;
    }
    /**获取apMac地址*/
    get apMac(): any {
        return this._apMac;
    }
    /**设置apMac地址*/
    set apMac(value: any) {
        this._apMac = value;
    }
    /**获取ap申购时间*/
    get factoryTime(): any {
        return this._factoryTime;
    }
    /**设置ap申购时间*/
    set factoryTime(value: any) {
        this._factoryTime = value;
    }
    /**获取ap是否已申购*/
    get apBelong(): any {
        return this._apBelong;
    }
    /**设置ap是否已申购*/
    set apBelong(value: any) {
        this._apBelong = value;
    }

    /**备注*/
    get remark(): any {
        return this._remark;
    }
    /**备注*/
    set remark(value: any) {
        this._remark = value;
    }
}
/**设置设备管理table表格 行数据*/
export function setDeviceRow(rowData: any, updateData: DeviceModalInterface) {
    rowData.apId = updateData.apId;
    rowData.businessId = updateData.businessId;
    rowData.businessName = updateData.businessName;
    rowData.apName = updateData.apName;
    rowData.apSN = updateData.apSN;
    rowData.apModel = updateData.apModel;
    rowData.apModelDescription = updateData.apModelDescription;
    rowData.apMac = updateData.apMac;
    rowData.factoryTime = updateData.factoryTime;
    return rowData;
}
/**设置设备资产管理平台table表格 行数据*/
export function setPlatFormRow(rowData: any, updateData: DeviceModalInterface) {
    rowData.apId = updateData.apId;
    rowData.businessId = updateData.businessId;
    rowData.businessName = updateData.businessName;
    rowData.apName = updateData.apName;
    rowData.apSN = updateData.apSN;
    rowData.apModel = updateData.apModel;
    rowData.apModelDescription = updateData.apModelDescription;
    rowData.apMac = updateData.apMac;
    rowData.factoryTime = updateData.factoryTime;
    rowData.apBelong = updateData.apBelong;
    rowData.remark = updateData.remark;
    return rowData;
}
