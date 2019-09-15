export interface AuthenticationInterface {
    id: number;
    /** portal名称 */
    portalName?: string;
    /** portal服务器地址 */
    portalIp?: string;
    /** 密钥 */
    portalShareKey?: string;
    /** 端口 */
    portalAuthPort?: number;
    /** portal 地址 */
    portalUrl?: string;
    /** 白名单 */
    whiteList?: Array <string>;
    /** 备注 */
    remarks?: string;

    /** 名称 */
    radiusName?: string;
    /** 服务器ip */
    masterServerIp?: string;
    /** 密钥 */
    masterServerKey?: string;
    /** 认证端口 */
    masterServerAuthPort?: number;
    /** 计费端口 */
    masterServerFeePort?: number;
}

export class AuthenticationModel {

    private _id: number;
     /** 名称 */
    private _name: string;
     /** IP地址 */
    private _serverIp: string;
     /** 密钥 */
    private _shareKey: string;
     /** portal 地址 */
    private _portalUrl: string;
    /** 白名单 */
    private _whiteList: Array <string>;
    /** portal 端口 */
    private _portalPort: number;
    /** 认证端口 */
    private _authPort: number;
    /** 计费端口 */
    private _feePort: number;
     /** 备注 */
    private _remarks: string;

    constructor() {
        this.id = null;
        this.name = '';
        this.serverIp = '';
        this.shareKey = '';
        this.portalUrl = '';
        this.whiteList = [];
        this.portalPort = 1;
        this.authPort = 1;
        this.feePort = 1;
        this.remarks = '';
    }

    public setPortalData(data: AuthenticationInterface) {
        this.id = data.id;
        this.name = data.portalName;
        this.serverIp = data.portalIp;
        this.shareKey = data.portalShareKey;
        this.portalPort = data.portalAuthPort;
        this.portalUrl = data.portalUrl;
        this.whiteList = data.whiteList;
        this.remarks = data.remarks;
    }

    public getPortalData() {
        return {
            "portalName" : this.name,
            "portalIp" : this.serverIp,
            "portalShareKey" : this.shareKey,
            "portalAuthPort" : this.portalPort,
            "portalUrl" : this.portalUrl,
            "whiteList": this.whiteList,
            "remarks" : this.remarks
        };
    }

    public setRadiusData(data: AuthenticationInterface) {
        this.id = data.id;
        this.name = data.radiusName;
        this.serverIp = data.masterServerIp;
        this.shareKey = data.masterServerKey;
        this.authPort = data.masterServerAuthPort;
        this.feePort = data.masterServerFeePort;
        this.remarks = data.remarks;
    }

    public getRadiusData() {
        return {
            "radiusName": this.name,
            "masterServerIp": this.serverIp,
            "masterServerKey": this.shareKey,
            "masterServerAuthPort": this.authPort,
            "masterServerFeePort": this.feePort,
            "remarks": this.remarks
        };
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get serverIp(): string {
        return this._serverIp;
    }

    set serverIp(value: string) {
        this._serverIp = value;
    }

    get shareKey(): string {
        return this._shareKey;
    }

    set shareKey(value: string) {
        this._shareKey = value;
    }

    get portalUrl(): string {
        return this._portalUrl;
    }

    set portalUrl(value: string) {
        this._portalUrl = value;
    }

    get whiteList(): Array<string> {
        return this._whiteList;
    }

    set whiteList(value: Array<string>) {
        this._whiteList = value;
    }

    get portalPort(): number {
        return this._portalPort;
    }

    set portalPort(value: number) {
        this._portalPort = value;
    }

    get authPort(): number {
        return this._authPort;
    }

    set authPort(value: number) {
        this._authPort = value;
    }

    get feePort(): number {
        return this._feePort;
    }

    set feePort(value: number) {
        this._feePort = value;
    }

    get remarks(): string {
        return this._remarks;
    }

    set remarks(value: string) {
        this._remarks = value;
    }
}

export function setPortalRow(rowData: any, updateData: AuthenticationInterface) {
    rowData.portalName = updateData.portalName;
    rowData.portalIp = updateData.portalIp;
    rowData.portalShareKey = updateData.portalShareKey;
    rowData.portalAuthPort = updateData.portalAuthPort;
    rowData.portalUrl = updateData.portalUrl;
    rowData.remarks = updateData.remarks;
    return rowData;
}

export function setRadiusRow(rowData: any, updateData: AuthenticationInterface) {
    rowData.radiusName = updateData.radiusName;
    rowData.masterServerIp = updateData.masterServerIp;
    rowData.masterServerKey = updateData.masterServerKey;
    rowData.masterServerAuthPort = updateData.masterServerAuthPort;
    rowData.masterServerFeePort = updateData.masterServerFeePort;
    rowData.remarks = updateData.remarks;
    return rowData;
}
