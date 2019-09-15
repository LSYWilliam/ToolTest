import {BusinessInfomationInterface} from "./business-infomation.interface";

export class RegisterInfoModel {
    /**商家Id*/
    private _businessId: number;
    /**商家名称*/
    private _businessName: string;
    /**联系人*/
    private _businessContact: string;
    /**电话*/
    private _businessTel: string;
    /**地址*/
    private _businessAddr: string;
    /**设备总数*/
    private _apNum: number;
    /**设置注册信息数据*/
    public setData(data: BusinessInfomationInterface) {
        this.businessId = data.businessId;
        this.businessName = data.businessName;
        this.businessContact = data.businessContact;
        this.businessTel = data.businessTel;
        this.businessAddr = data.province + data.city + data.district + data.businessAddr;
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
    get businessName(): string {
        return this._businessName;
    }
    /**设置商家名称*/
    set businessName(value: string) {
        this._businessName = value;
    }
    /**获取联系人*/
    get businessContact(): string {
        return this._businessContact;
    }
    /**设置联系人*/
    set businessContact(value: string) {
        this._businessContact = value;
    }
    /**获取电话*/
    get businessTel(): string {
        return this._businessTel;
    }
    /**设置电话*/
    set businessTel(value: string) {
        this._businessTel = value;
    }
    /**获取地址*/
    get businessAddr(): string {
        return this._businessAddr;
    }
    /**设置地址*/
    set businessAddr(value: string) {
        this._businessAddr = value;
    }
    /**获取设备总数*/
    get apNum(): number {
        return this._apNum;
    }
    /**设置设备总数*/
    set apNum(value: number) {
        this._apNum = value;
    }
}
