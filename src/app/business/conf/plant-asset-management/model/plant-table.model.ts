import {PlantTableInterface} from "./plant-table.interface";
/**设备资产管理平台 table表格数据实体类*/
export class PlantTableModel {
    /**ap的Id*/
    private _apId: number;
    /**ap的名称*/
    private _apName: string;
    /**商家的名称*/
    private _businessName: string;
    /**商家的Id*/
    private _businessId: number;
    /**ap的序列号*/
    private _apSn: string;
    /**ap的型号*/
    private _apModel: string;
    /**ap的型号说明*/
    private _apModelDescription: string;
    /**ap的Mac地址*/
    private _apMac: string;
    /**ap的是否已申购*/
    private _apBelong: string;
    /**ap的申购时间*/
    private _factoryTime: string;

    /**constructor构造函数
     *      1. 设置设备资产管理表格每一行数据的默认值
     * */
    constructor(data: PlantTableInterface) {
        this.apId = data.apId;
        this.apName = data.apName;
        this.businessName = data.businessName;
        this.businessId = data.businessId;
        this.apSn = data.apSn;
        this.apModel = data.apModel;
        this.apModelDescription = data.apModelDescription;
        this.apMac = data.apMac;
        this.apBelong = data.apBelong;
        this.factoryTime = data.factoryTime;
    }
    /**获取ap的Id*/
    get apId(): number {
        return this._apId;
    }
    /**设置ap的Id*/
    set apId(value: number) {
        this._apId = value;
    }
    /**获取ap的名称*/
    get apName(): string {
        return this._apName;
    }
    /**设置ap的名称*/
    set apName(value: string) {
        this._apName = value;
    }
    /**获取商家的名称*/
    get businessName(): string {
        return this._businessName;
    }
    /**设置商家的名称*/
    set businessName(value: string) {
        this._businessName = value;
    }
    /**获取商家的Id*/
    get businessId(): number {
        return this._businessId;
    }
    /**设置商家的Id*/
    set businessId(value: number) {
        this._businessId = value;
    }
    /**获取ap的型号*/
    get apSn(): string {
        return this._apSn;
    }
    /**设置ap的型号*/
    set apSn(value: string) {
        this._apSn = value;
    }
    /**获取ap的型号*/
    get apModel(): string {
        return this._apModel;
    }
    /**设置ap的型号*/
    set apModel(value: string) {
        this._apModel = value;
    }
    /**获取ap的型号说明*/
    get apModelDescription(): string {
        return this._apModelDescription;
    }
    /**设置ap的型号说明*/
    set apModelDescription(value: string) {
        this._apModelDescription = value;
    }
    /**获取ap的Mac地址*/
    get apMac(): string {
        return this._apMac;
    }
    /**设置ap的Mac地址*/
    set apMac(value: string) {
        this._apMac = value;
    }
    /**获取ap的是否已申购*/
    get apBelong(): string {
        return this._apBelong;
    }
    /**设置ap的是否已申购*/
    set apBelong(value: string) {
        this._apBelong = value;
    }
    /**获取ap的申购时间*/
    get factoryTime(): string {
        return this._factoryTime;
    }
    /**设置ap的申购时间*/
    set factoryTime(value: string) {
        this._factoryTime = value;
    }

    public toString() {
        return {
            'apId': this.apId, 'apName':this.apName, 'businessName': this.businessName,'businessId': this.businessId,
            'apSn':this.apSn, 'apModel': this.apModel, 'apModelDescription':this.apModelDescription,
            'apMac': this.apMac, 'apBelong': this.apBelong, 'factoryTime': this.factoryTime
        }
    }
}
