export interface SsidInfoInterface{
    id?: number;
    /** SSID状态 0：关闭；1：开启 */
    ssidStatus?: number;
    /** 对应黑名单 0：未开启； 1：已开启 */
    blackEnable? :number;
    /** 下载限速。默认单位KB。0代表无限速。 */
    downSpeedLimit? : number;
    /** ip分配方式 1、桥接 2、集中器第三层漫游 3、NAT模式 */
    ipDistribution?: number;
    /** 对ip分配方式的说明 */
    ipDistributionDesc?: string;
    /** 不知道什么鬼 */
    portalAuthInfo?: any;
    /** null,代表无 */
    portalServerName?: string;
    radiusInfo?: any;
    /** null,代表无 */
    radiusServerName?:string;
    /** 0：OPEN；1：WEP64；2：WEP128；3：WPA-PSK/WPA2-PSK；4.WPA-EAP/WPA2-EAP 默认0. */
    saftetyCertified?: number;
    /** 0:未启用ewifi认证；1:启用ewifi认证 */
    certification?: number;
    /** 对认证方式的说明 */
    saftetyCertifiedDesc?: string;
    /** SSID的名称 */
    ssidName?:string;
    /** 开启vpn。0：关闭：1：开启 */
    vpnAllow?: number;
    /** 对应黑名单 0：未开启； 1：已开启； */
    whiteEnable?: number;

    vlanId?: number;
    /** 射频 0：2G；1：5G；2：2G/5G*/
    rf: number;
    acl: string;
}

export class SsidInfoModel{
    private _id: number;
    private _ssidName: string;
    /** SSID状态 0：关闭；1：开启 */
    private _ssidStatus: boolean;
    /** 0：OPEN；1：WEP64；2：WEP128；3：WPA-PSK/WPA2-PSK；4.WPA-EAP/WPA2-EAP 默认0. */
    private _saftetyCertified: string;
    /** 0:未启用ewifi认证；1启用ewifi认证 */
    private _certification: number;
    /** null,代表无 */
    private _portalServerName: string;
    /** null,代表无 */
    private _radiusServerName:string;
    /** 下载限速。默认单位KB。0代表无限速。 */
    private _downSpeedLimit: string;
    /** ip分配方式 1、桥接 2、集中器第三层漫游 3、NAT模式 */
    private _ipDistribution: string;
    /** 开启vpn。0：关闭：1：开启 */
    private _vpnAllow: string;
    /** 对应黑名单 0：未开启； 1：已开启 */
    private _blackEnable:string;
    /** 对应黑名单 0：未开启； 1：已开启； */
    private _whiteEnable: string;
    /**每一个(即指定)ssid的整个数据*/
    private _rawData: SsidInfoInterface;

    private _vlanId: number;

    /** 射频 0：2G；1：5G；2：2G/5G*/
    private _rf: number;

    private  _acl: string;

    /**设置每一个ssid的具体数据*/
    public setData(data: SsidInfoInterface) {
        this.id = data.id;
        this.ssidName = data.ssidName;
        this.ssidStatus = data.ssidStatus !== 0;
        this.saftetyCertified = data.saftetyCertifiedDesc;
        this.certification = data.certification;
        this.portalServerName = data.portalServerName === null ? '无': data.portalServerName;
        this.radiusServerName = data.radiusServerName === null ? '无': data.radiusServerName;
        this.downSpeedLimit = data.downSpeedLimit === 0 ? '无限速': data.downSpeedLimit + 'kbps';
        this.ipDistribution = data.ipDistributionDesc;
        this.vpnAllow = data.vpnAllow === 0? '未开启' : '已开启';
        this.blackEnable = data.blackEnable === 0? '未开启' : '已开启';
        this.whiteEnable = data.whiteEnable === 0? '未开启' : '已开启';

        this.vlanId = data.vlanId;
        this.rf = data.rf;
        this.acl = data.acl;

        this.rawData = data;
    }
    /**获取SSID 的ID*/
    get id(): number {
        return this._id;
    }
    /**设置SSID 的ID*/
    set id(value: number) {
        this._id = value;
    }
    /**获取SSID 的名称*/
    get ssidName(): string {
        return this._ssidName;
    }
    /**设置SSID 的ID*/
    set ssidName(value: string) {
        this._ssidName = value;
    }
    /**获取ssid状态是否开启的值*/
    get ssidStatus(): boolean {
        return this._ssidStatus;
    }
    /**设置ssid状态是否开启的值*/
    set ssidStatus(value: boolean) {
        this._ssidStatus = value;
    }
    /**获取共享密钥下的安全认证名称的值*/
    get saftetyCertified(): string {
        return this._saftetyCertified;
    }
    /**设置共享密钥下的安全认证名称的值*/
    set saftetyCertified(value: string) {
        this._saftetyCertified = value;
    }
    /**获取是否启用ewifi认证相关情况*/
    get certification(): number {
        return this._certification;
    }
    /**设置是否启用ewifi认证相关情况*/
    set certification(value: number) {
        this._certification = value;
    }
    /**获取portal服务器名称的值*/
    get portalServerName(): string {
        return this._portalServerName;
    }
    /**设置portal服务器名称的值*/
    set portalServerName(value: string) {
        this._portalServerName = value;
    }
    /**获取radius服务器名称的值*/
    get radiusServerName(): string {
        return this._radiusServerName;
    }
    /**设置radius服务器名称的值*/
    set radiusServerName(value: string) {
        this._radiusServerName = value;
    }
    /**获取限速的值*/
    get downSpeedLimit(): string {
        return this._downSpeedLimit;
    }
    /**设置限速的值*/
    set downSpeedLimit(value: string) {
        this._downSpeedLimit = value;
    }
    /**获取客户端IP分配方式的值*/
    get ipDistribution(): string {
        return this._ipDistribution;
    }
    /**设置客户端IP分配方式的值*/
    set ipDistribution(value: string) {
        this._ipDistribution = value;
    }

    /**获取vpn是否开启的值*/
    get vpnAllow(): string {
        return this._vpnAllow;
    }
    /**设置vpn是否开启的值*/
    set vpnAllow(value: string) {
        this._vpnAllow = value;
    }
    /**获取黑名单是否开启的值*/
    get blackEnable(): string {
        return this._blackEnable;
    }
    /**设置黑名单是否开启的值*/
    set blackEnable(value: string) {
        this._blackEnable = value;
    }
    /**获取白名单是否开启的值*/
    get whiteEnable(): string {
        return this._whiteEnable;
    }
    /**设置白名单是否开启的值*/
    set whiteEnable(value: string) {
        this._whiteEnable = value;
    }
    /**获取每一个(即指定)ssid的整个数据*/
    get rawData(): SsidInfoInterface {
        return this._rawData;
    }
    /**设置每一个(即指定)ssid的整个数据*/
    set rawData(value: SsidInfoInterface) {
        this._rawData = value;
    }

    get vlanId(): number {
        return this._vlanId;
    }

    set vlanId(value: number) {
        this._vlanId = value;
    }

    get rf(): number {
        return this._rf;
    }

    set rf(value: number) {
        this._rf = value;
    }

    get acl(): string {
        return this._acl;
    }

    set acl(value: string) {
        this._acl = value;
    }
}
