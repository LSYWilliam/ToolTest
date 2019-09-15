export interface SsidConfInterface {
    /** SSID 的ID */
    id?: number;
    /** SSID 的名称 */
    ssidName?: string;
    /** 认证方式 0、免密上网 1、共享密钥 2、eWifi认证 */
    authentication?: number;
    /** 0：OPEN；1：WEP64；2：WEP128；3：WPA-PSK/WPA2-PSK；4.WPA-EAP/WPA2-EAP 默认0. */
    saftetyCertified?: number;
    /** 认证密钥 */
    saftetyCertifiedKey?: string;
    /** 0:未启用ewifi认证；1:启用ewifi认证 */
    certification?: number;
    /** 默认1。 1：桥接 2：3层 3：NAT */
    ipDistribution?: number;
    /** 0:不允许，1：允许 */
    vpnAllow?: number;
    /** 0:隐藏 1:显示。默认1 */
    suppressSsid?: number;
    /** 终端隔离。默认开启。1 .0：不开启 1：开启 */
    stationInsulate?: number;
    /** 限速。null或0为不限速 */
    downSpeedLimit?: number;
    /**ssid状态，1：开启  0： 关闭*/
    ssidStatus?: number;
    /** */
    portalServer?: number;
    radiusServer?: number;

    vlanId?: number;
    rf?: number;
    acl?: string;

    validateFlagStack?: object;
    ssidNameValidateFlag?: boolean;
    vlanIdValidateFlag?: boolean;
    aclValidateFlag?: boolean;
}


export class SsidConfModel {
    /** SSID 的ID */
    private _id: number;
     /** SSID 的名称 */
    private _ssidName: string;
    /** 认证方式 0、免密上网 1、共享密钥 2、eWifi认证 */
    private _authentication: string;
    /** 0:未启用ewifi认证；1启用ewifi认证 */
    private _certification: number;
     /** 0：OPEN；1：WEP64；2：WEP128；3：WPA-PSK/WPA2-PSK；4.WPA-EAP/WPA2-EAP 默认0. */
    private _saftetyCertified: number;
    private _saftetyCertifiedDefault: string = 'WEP64';
     /** 认证密钥 */
    private _saftetyCertifiedKey: string;
     /** 默认1。 1：桥接 2：3层 3：NAT */
    private _ipDistribution: string;
     /** 0:不允许，1：允许 */
    private _vpnAllow: boolean;
     /** 0:隐藏 1:显示。默认1 */
    private _suppressSsid: boolean;
     /** 终端隔离。默认开启。1 .0：不开启 1：开启 */
    private _stationInsulate : boolean;
     /** 限速。null或0为不限速 */
    private _downSpeedLimit : number;
    /**ssid状态，1：开启  0： 关闭*/
    private _ssidStatus: number;
    /**portal服务id*/
    private _portalServer: number;
    /**radius服务id*/
    private _radiusServer: number;

    private _vlanId: number;
    /** 射频 0：2G；1：5G；2：2G/5G*/
    private _rf: number;

    private _acl: string;

    private _validateFlagStack: object = {};

    /**设置每一个指定的ssid数据*/
    public setData(data: SsidConfInterface) {
        this.id = data.id;
        this.ssidName = data.ssidName;
        if (data.saftetyCertified === 0) {
            this.authentication = '1';
        } else {
            switch (data.saftetyCertified) {
                case 1:
                    this.saftetyCertifiedDefault = 'WEP64';
                    break;
                case 2:
                    this.saftetyCertifiedDefault = 'WEP128';
                    break;
                case 3:
                    this.saftetyCertifiedDefault = 'WPA-PSK/WPA2-PSK';
                    break;
                case 4:
                    this.saftetyCertifiedDefault = 'WPA-EAP/WPA2-EAP';
                    break;
            }
            this.authentication = '2';
        }
        this.certification = data.certification;
        this.saftetyCertified = data.saftetyCertified;
        this.saftetyCertifiedKey = data.saftetyCertifiedKey;
        this.ipDistribution = data.ipDistribution.toString();
        this.vpnAllow = data.vpnAllow != 0;
        this.suppressSsid = data.suppressSsid != 0;
        this.stationInsulate = data.stationInsulate != 0;
        this.downSpeedLimit = data.downSpeedLimit ;
        this.ssidStatus = data.ssidStatus;
        this.portalServer = data.portalServer;
        this.radiusServer = data.radiusServer;

        this.vlanId = data.vlanId;
        this.rf = data.rf;
        this.acl = data.acl;
    }
    /**获取每一个指定的ssid数据*/
    public getData() {
        let saftetyCertified : number;
        switch (this.authentication) {
            case '1':
                saftetyCertified = 0;
                break;
            case '2':
                if (this.saftetyCertified === 0) {
                    saftetyCertified = 1;
                } else {
                    saftetyCertified = this.saftetyCertified;
                }
                break;
        }

        return {
            'id': this.id,
            'ssidName' : this.ssidName,
            'saftetyCertified' : saftetyCertified,
            'saftetyCertifiedKey': this.saftetyCertifiedKey,
            'certification': this.certification,
            'stationInsulate' : this.stationInsulate ? 1: 0,
            'ssidStatus' : this.ssidStatus,
            'suppressSsid' : this.suppressSsid ? 1: 0,
            'vpnAllow' : this.vpnAllow? 1:0,
            'ipDistribution' : this.ipDistribution,
            'downSpeedLimit': this.downSpeedLimit,
            'portalServer': this.portalServer,
            'radiusServer': this.radiusServer,
            'vlanId': this.vlanId,
            'rf': this.rf,
            'acl': this.acl,
            'validateFlagStack':this.validateFlagStack
        }
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
    /**设置SSID 的名称*/
    set ssidName(value: string) {
        this._ssidName = value;
    }
    /**获取共享密钥下的安全认证名称的值*/
    get saftetyCertified(): number {
        return this._saftetyCertified;
    }
    /**设置共享密钥下的安全认证名称的值*/
    set saftetyCertified(value: number) {
        this._saftetyCertified = value;
    }
    /**获取共享密钥下的安全认证密钥的值*/
    get saftetyCertifiedKey(): string {
        return this._saftetyCertifiedKey;
    }
    /**设置共享密钥下的安全认证密钥的值*/
    set saftetyCertifiedKey(value: string) {
        this._saftetyCertifiedKey = value;
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
    get vpnAllow(): boolean {
        return this._vpnAllow;
    }
    /**设置vpn是否开启的值*/
    set vpnAllow(value: boolean) {
        this._vpnAllow = value;
    }
    /**获取隐藏ssid是否开启的值*/
    get suppressSsid(): boolean {
        return this._suppressSsid;
    }
    /**设置隐藏ssid是否开启的值*/
    set suppressSsid(value: boolean) {
        this._suppressSsid = value;
    }
    /**获取station隔离是否开启的值*/
    get stationInsulate(): boolean {
        return this._stationInsulate;
    }
    /**设置station隔离是否开启的值*/
    set stationInsulate(value: boolean) {
        this._stationInsulate = value;
    }
    /**获取限速的值*/
    get downSpeedLimit(): number {
        return this._downSpeedLimit;
    }
    /**设置限速的值*/
    set downSpeedLimit(value: number) {
        this._downSpeedLimit = value;
    }
    /**获取认证方式的值*/
    get authentication(): string {
        return this._authentication;
    }
    /**设置认证方式的值*/
    set authentication(value: string) {
        this._authentication = value;
    }
    /**获取是否wifi认证*/
    get certification(): number {
        return this._certification;
    }
    /**设置是否wifi认证*/
    set certification(value: number) {
        this._certification = value;
    }
    /**获取ssid状态是否开启的值*/
    get ssidStatus(): number {
        return this._ssidStatus;
    }
    /**设置ssid状态是否开启的值*/
    set ssidStatus(value: number) {
        this._ssidStatus = value;
    }
    /**获取portal服务列表的值*/
    get portalServer(): number {
        return this._portalServer;
    }
    /**设置portal服务列表的值*/
    set portalServer(value: number) {
        this._portalServer = value;
    }
    /**获取radius服务列表的值*/
    get radiusServer(): number {
        return this._radiusServer;
    }
    /**获取radius服务列表的值*/
    set radiusServer(value: number) {
        this._radiusServer = value;
    }
    /**获取共享密钥下面的安全认证名称默认值*/
    get saftetyCertifiedDefault(): string {
        return this._saftetyCertifiedDefault;
    }
    /**设置共享密钥下面的安全认证名称默认值*/
    set saftetyCertifiedDefault(value: string) {
        this._saftetyCertifiedDefault = value;
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

    get validateFlagStack(): object {
        return this._validateFlagStack;
    }

    set validateFlagStack(value: object) {
        this._validateFlagStack = value;
    }
}
