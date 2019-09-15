/**网络列表模态框数据接口*/
export interface BusinessNetListModalInterface {
    /**网络名称*/
    netName: any;
    /**商家名称*/
    businessName: any;
    /**商家Id*/
    businessId: number;
    /**省*/
    province: any;
    /**市*/
    city: any;
    /**区*/
    county: any;
    /**某某号*/
    detailAddress: any;
    /**整个完整地址*/
    completeAddress: any;
    /**联系人*/
    netContact: any;
    /**联系方式*/
    netTel: any;
    /**设备数量*/
    assetCount: any;
    /**设备型号*/
    apModel: any;
    /**网络有效日期*/
    dueTime: any;
    /**设备信息*/
    assetsDesc: any;
}
/**商户列表模态框数据实体类*/
export class BusinessNetListModalModel {
    /**网络名称*/
    private _netName: string;
    /**商家名称*/
    private _businessName: any;
    /**商家Id*/
    private _businessId: number;
    /**省*/
    private _province: any;
    /**市*/
    private _city: any;
    /**区*/
    private _county: any;
    /**某某号*/
    private _detailAddress: any;
    /**整个完整地址*/
    private _completeAddress: any;
    /**联系人*/
    private _netContact: any;
    /**电话*/
    private _netTel: any;
    /**设备数量*/
    private _assetCount: any;
    /**设备型号*/
    private _apModel: any;
    /**网络有效日期*/
    private _dueTime: any;
    /**设备信息*/
    private _assetsDesc: any;
    /**初始化商户列表模态框数据*/
    constructor() {
        this.netName = '';
        this.businessName = '';
        this.businessId = null;
        this.province = '';
        this.city = '';
        this.county = '';
        this.detailAddress = '';
        this.completeAddress = '';
        this.netContact = '';
        this.netTel = '';
        this.assetCount = '';
        this.apModel = '';
        this.dueTime = '';
        this.assetsDesc = '';
    }
    /**设置网络列表模态框数据*/
    public setNetListModalData(data: BusinessNetListModalInterface) {
        this.netName = data.netName;
        this.businessId = data.businessId;
        this.businessName = data.businessName;
        this.province = data.province;
        this.city = data.city;
        this.county = data.county;
        this.detailAddress = data.detailAddress;
        this.completeAddress = data.completeAddress;
        this.netContact = data.netContact;
        this.netTel = data.netTel;
        this.assetCount = data.assetCount;
        this.apModel = data.apModel;
        this.dueTime = data.dueTime;
        this.assetsDesc = data.assetsDesc;
    }
    /**获取网络列表模态框数据新增数据*/
    // public getNetListModalData() {
    //     return {
    //         "netName" : this.netName,
    //         "businessId" : this.businessId,
    //         "businessName" : this.businessName,
    //         "province" : this.province,
    //         "city" : this.city,
    //         "county" : this.county,
    //         "detailAddress" : this.detailAddress,
    //         "netContact" : this.netContact,
    //         "netTel" : this.netTel,
    //         "assetNum" : this.assetNum,
    //         "apModel" : this.apModel,
    //         "dueTime" : this.dueTime,
    //         "assetsDesc" : this.assetsDesc
    //     };
    // }
    public getNetListModalData(data) {
        let arr: any[] = [];
        for (let item of data) {
            let index = item.split(' ');
            arr.push({assetModel: index[0], assetCount: Number(index[1].substring(0, index[1].indexOf('台')))});
        }
        return {
            "netInfo": {
                "netName": this.netName,
                "businessId": this.businessId,
                "dueTime": this.dueTime,
                "netContact": this.netContact,
                "netTel": this.netTel,
                "province": this.province,
                "city": this.city,
                "county": this.county,
                "detailAddress": this.detailAddress
            },
            "workOrderAssetList": arr
        };
    }

    /**获取网络列表模态框编辑数据*/
    public getNetListModalEditData(netId) {
        const obj = {
            "netId": netId,
            "netName": this.netName,
            "businessId": this.businessId,
            "dueTime": this.dueTime,
            "netContact": this.netContact,
            "netTel": this.netTel,
            "province": this.province,
            "city": this.city,
            "county":this.county,
            "detailAddress": this.detailAddress
        };
        return  obj;
    }
    /**获取网络名称*/
    get netName(): any {
        return this._netName;
    }
    /**设置网络名称*/
    set netName(value: any) {
        this._netName = value;
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
    get businessName(): any {
        return this._businessName;
    }
    /**设置商家名称*/
    set businessName(value: any) {
        this._businessName = value;
    }

    /**获取省*/
    get province(): any {
        return this._province;
    }
    /**设置省*/
    set province(value: any) {
        this._province = value;
    }
    /**获取市*/
    get city(): any {
        return this._city;
    }
    /**设置市*/
    set city(value: any) {
        this._city = value;
    }
    /**获取区*/
    get county(): any {
        return this._county;
    }
    /**设置区*/
    set county(value: any) {
        this._county = value;
    }

    /**获取某某号*/
    get detailAddress(): any {
        return this._detailAddress;
    }
    /**设置某某号*/
    set detailAddress(value: any) {
        this._detailAddress = value;
    }

    /**获取完整地址*/
    get completeAddress(): any {
        return this._completeAddress;
    }
    /**设置完整地址*/
    set completeAddress(value: any) {
        this._completeAddress = value;
    }

    /**获取联系人*/
    get netContact(): any {
        return this._netContact;
    }
    /**设置联系人*/
    set netContact(value: any) {
        this._netContact = value;
    }
    /**获取电话*/
    get netTel(): any {
        return this._netTel;
    }
    /**设置电话*/
    set netTel(value: any) {
        this._netTel = value;
    }

    /**获取设备数量*/
    get assetCount(): any {
        return this._assetCount;
    }
    /**设置设备数量*/
    set assetCount(value: any) {
        this._assetCount = value;
    }
    /**获取设备数量*/
    get apModel(): any {
        return this._apModel;
    }
    /**设置设备数量*/
    set apModel(value: any) {
        this._apModel = value;
    }

    /**网络有效日期*/
    get dueTime(): any {
        return this._dueTime;
    }
    /**网络有效日期*/
    set dueTime(value: any) {
        this._dueTime = value;
    }

    /**获取设备信息*/
    get assetsDesc(): any {
        return this._assetsDesc;
    }
    /**设置设备信息*/
    set assetsDesc(value: any) {
        this._assetsDesc = value;
    }
}

