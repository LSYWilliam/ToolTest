/**商户列表模态框数据接口*/
export interface BusinessModalInterface {
    id: number;
    /**商家Id*/
    businessId: number;
    /**省*/
    province: any;
    /**市*/
    city: any;
    /**区*/
    district: any;
    /**商家名称*/
    businessName: any;
    /**联系人*/
    businessContact: any;
    /**电话*/
    businessTel: any;
    /**地址*/
    businessAddr: any;
    /**某某号*/
    completeAddress: any;
    /**创建时间*/
    createTime: any;
}
/**商户列表模态框数据实体类*/
export class BusinessModalModel {
    private _id: number;
    /**商家Id*/
    private _businessId: number;
    /**省*/
    private _province: any;
    /**市*/
    private _city: any;
    /**区*/
    private _district: any;
    /**商家名称*/
    private _busiName: any;
    /**联系人*/
    private _busiContact: any;
    /**电话*/
    private _busiTel: any;
    /**地址*/
    private _businessAddr: any;
    /**某某号*/
    private _completeAddress: any;
    /**创建时间*/
    private _createTime: any;
    /**初始化商户列表模态框数据*/
    constructor() {
        this.id = null;
        this.businessId = null;
        this.province = '';
        this.city = '';
        this.district = '';
        this.busiName = '';
        this.busiContact = '';
        this.busiTel = '';
        this.businessAddr = '';
        this.completeAddress = '';
        this.createTime = '';
    }
    /**设置商户列表模态框数据*/
    public setBusinessData(data: BusinessModalInterface) {
        this.id = data.id;
        this.businessId = data.businessId;
        this.province = data.province;
        this.city = data.city;
        this.district = data.district;
        this.busiName = data.businessName;
        this.busiContact = data.businessContact;
        this.busiTel = data.businessTel;
        this.businessAddr = data.businessAddr;
        this.completeAddress = data.completeAddress;
        this.createTime = data.createTime;
    }
    /**设置商户列表模态框数据默认值*/
    public getBusinessData() {
        return {
            "id" : this.id,
            "businessId" : this.businessId,
            "province" : this.province,
            "city" : this.city,
            "district" : this.district,
            "businessName" : this.busiName,
            "businessContact" : this.busiContact,
            "businessTel" : this.busiTel,
            "businessAddr" : this.businessAddr,
            "completeAddress" : this.completeAddress,
            "createTime" : this.createTime
        };
    }
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
    /**获取商家Id*/
    get businessId(): number {
        return this._businessId;
    }
    /**设置商家Id*/
    set businessId(value: number) {
        this._businessId = value;
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
    get district(): any {
        return this._district;
    }
    /**设置区*/
    set district(value: any) {
        this._district = value;
    }
    /**获取商家名称*/
    get busiName(): any {
        return this._busiName;
    }
    /**设置商家名称*/
    set busiName(value: any) {
        this._busiName = value;
    }
    /**获取联系人*/
    get busiContact(): any {
        return this._busiContact;
    }
    /**设置联系人*/
    set busiContact(value: any) {
        this._busiContact = value;
    }
    /**获取电话*/
    get busiTel(): any {
        return this._busiTel;
    }
    /**设置电话*/
    set busiTel(value: any) {
        this._busiTel = value;
    }
    /**获取地址*/
    get businessAddr(): any {
        return this._businessAddr;
    }
    /**设置地址*/
    set businessAddr(value: any) {
        this._businessAddr = value;
    }
    /**获取详细地址*/
    get completeAddress(): any {
        return this._completeAddress;
    }
    /**设置详细地址*/
    set completeAddress(value: any) {
        this._completeAddress = value;
    }
    /**获取创建时间*/
    get createTime(): any {
        return this._createTime;
    }
    /**设置创建时间*/
    set createTime(value: any) {
        this._createTime = value;
    }

}
/**设置商户列表表格行数据*/
export function setBusinessRow(rowData: any, updateData: BusinessModalInterface) {
    rowData.id = updateData.id;
    rowData.businessId = updateData.businessId;
    rowData.province = updateData.province;
    rowData.city = updateData.city;
    rowData.district = updateData.district;
    rowData.businessName = updateData.businessName;
    rowData.businessContact = updateData.businessContact;
    rowData.businessTel = updateData.businessTel;
    rowData.businessAddr = updateData.businessAddr;
    rowData.completeAddress = updateData.completeAddress;
    rowData.createTime = updateData.createTime;
    return rowData;
}
