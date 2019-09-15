export class EquipmentAssetModalInterface {
    /**设备Id*/
    assetId: any;
    /**设备名称*/
    assetName: any;
    /**设备状态*/
    assetStatus: any;
    /**设备状态描述*/
    assetStatusDes: any;
    /**设备序列号*/
    assetSn: any;
    /**mac地址*/
    assetMac: any;
    /**型号*/
    assetModel: any;
    /**型号说明*/
    assetModelDescription: any;
    /**设备归属ID*/
    businessId: any;
    /**设备归属*/
    businessName: any;
    /**备注*/
    remark: any;
    /**出厂时间*/
    factoryTime: any;
    /**安装时间*/
    installTime: any;
    /**废弃时间*/
    abandonedTime: any;
    /**是否废弃小图标*/
    isAbandonedIcon: any;
    /**详情*/
    details: any;
}
export class EquipmentAssetModalModel {
    /**设备Id*/
    private _assetId: any;
    /**设备名称*/
    private _assetName: any;
    /**设备状态*/
    private _assetStatus: any;
    /**设备状态描述*/
    private _assetStatusDes: any;
    /**设备序列号*/
    private _assetSn: any;
    /**mac地址*/
    private _assetMac: any;
    /**型号*/
    private _assetModel: any;
    /**型号说明*/
    private _assetModelDescription: any;
    /**设备归属ID*/
    private _businessId: any;
    /**设备归属*/
    private _businessName: any;
    /**备注*/
    private _remark: any;
    /**出厂时间*/
    private _factoryTime: any;
    /**安装时间*/
    private _installTime: any;
    /**废弃时间*/
    private _abandonedTime: any;
    /**是否废弃小图标*/
    private _isAbandonedIcon: any;
    /**详情*/
    private _details: any;
    /**初始化设备资产模态框数据*/
    constructor() {
        this.assetName = '';
        this.assetSn = '';
        this.assetModel = '';
        this.assetModelDescription = '';
        this.assetMac = '';
        this.factoryTime = '';
    }
    /**获取设备资产模态框数据*/
    getEquipmentAssetModalData() {
        return {
            "assetId": this.assetId,
            "assetName": this.assetName,
            "assetSn": this.assetSn,
            "assetModel": this.assetModel,
            "assetModelDescription": this.assetModelDescription,
            "assetMac": this.assetMac,
            "factoryTime": this.factoryTime,
        }
    }
    get assetId(): string {
        return this._assetId;
    }
    set assetId(value: string) {
        this._assetId = value;
    }

    get assetName(): string {
        return this._assetName;
    }
    set assetName(value: string) {
        this._assetName = value;
    }

    get assetSn(): string {
        return this._assetSn;
    }
    set assetSn(value: string) {
        this._assetSn = value;
    }

    get assetModel(): string {
        return this._assetModel;
    }
    set assetModel(value: string) {
        this._assetModel = value;
    }

    get assetModelDescription(): string {
        return this._assetModelDescription;
    }
    set assetModelDescription(value: string) {
        this._assetModelDescription = value;
    }

    get assetMac(): string {
        return this._assetMac;
    }
    set assetMac(value: string) {
        this._assetMac = value;
    }

    get factoryTime(): string {
        return this._factoryTime;
    }
    set factoryTime(value: string) {
        this._factoryTime = value;
    }
}
