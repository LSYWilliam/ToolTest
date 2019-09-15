import {ApListTableInterface} from "./ap-list-table.interface";

export class ApListTableModel {

    /** AP id*/
    private _apId: number;
    /** AP 类型*/
    private _status: string;
    /** AP 序列号*/
    private _apSn: string;
    /** AP 名称*/
    private _apName: string;
    /** AP 型号*/
    private _apModel: string;
    /** AP MAC*/
    private _apMac: string;
    /** AP 本地IP*/
    private _localIp: string;
    /** AP 设备数量*/
    private _onlineNum: number;
    /** AP 今日转发流量*/
    private _dayTraffic: string;
    /**备注*/
    private _remark: any;

    /**
     * 构造函数
     * @param data: ApListTableInterface
     *        数据初始化（赋值）
     */
    constructor(data: ApListTableInterface) {
        this.apId = data.apId;
        this.status = data.apStatusIcon;
        this.apSn = data.apSn;
        this.apName = data.apName;
        this.apModel = data.apModel;
        this.apMac = data.apMac.toUpperCase();
        this.localIp = data.apIp;
        this.onlineNum = data.onlineNum;
        this.dayTraffic = data.dayTraffic;
        this.remark = data.remark;
    }

    /**
     * 数据类型转换
     * @description
     *      将数据转换成JSON
     * */
    public toString() {
        return {
            "apId":this.apId, "status": this.status, "apName": this.apName,
            "apSn":this.apSn, "apModel": this.apModel, "apMac": this.apMac.toUpperCase(), "localIp": this.localIp,
            "onlineNum": this.onlineNum, "dayTraffic": this.dayTraffic, "remark": this.remark
        };
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get apName(): string {
        return this._apName;
    }

    set apName(value: string) {
        this._apName = value;
    }

    get apSn(): string {
        return this._apSn;
    }

    set apSn(value: string) {
        this._apSn = value;
    }

    get apModel(): string {
        return this._apModel;
    }

    set apModel(value: string) {
        this._apModel = value;
    }

    get apMac(): string {
        return this._apMac;
    }

    set apMac(value: string) {
        this._apMac = value;
    }

    get localIp(): string {
        return this._localIp;
    }

    set localIp(value: string) {
        this._localIp = value;
    }

    get onlineNum(): number {
        return this._onlineNum;
    }

    set onlineNum(value: number) {
        this._onlineNum = value;
    }

    get dayTraffic(): string {
        return this._dayTraffic;
    }

    set dayTraffic(value: string) {
        this._dayTraffic = value;
    }


    get apId(): number {
        return this._apId;
    }

    set apId(value: number) {
        this._apId = value;
    }

    get remark(): any {
        return this._remark;
    }

    set remark(value: any) {
        this._remark = value;
    }
}
