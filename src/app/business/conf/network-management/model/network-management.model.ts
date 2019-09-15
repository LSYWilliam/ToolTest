import {AllRadioFreqModel} from "../../../../shared/model/all-radio-freq.model";
import {SsidConfInterface} from "../../../../wireless/conf/ssid-conf/model/ssid-conf.model";

export class SsidInfo {
    /** ssid状态 */
    private _ssidStatus: boolean;
    /** ssid详情 */
    private _ssidInfo: SsidConfInterface;

    get ssidStatus(): boolean {
        return this._ssidStatus;
    }

    set ssidStatus(value: boolean) {
        this._ssidStatus = value;
    }

    get ssidInfo(): SsidConfInterface {
        return this._ssidInfo;
    }

    set ssidInfo(value: SsidConfInterface) {
        this._ssidInfo = value;
    }
}

export class NetWorkInfo {
    /** 网络名称 */
    private _netName: string;
    /** 网络类型 */
    private _netType: number;


    /**网络省地址*/
    private _province: string;
    /**网络市地址*/
    private _city: string;
    /**网络区地址*/
    private _county: string;
    /**网络详细地址*/
    private _detailAddress: string;
    /**经度*/
    private _longitude: string;
    /**纬度*/
    private _latitude: string;


    get netName(): string {
        return this._netName;
    }

    set netName(value: string) {
        this._netName = value;
    }

    get netType(): number {
        return this._netType;
    }

    set netType(value: number) {
        this._netType = value;
    }

    get province(): string {
        return this._province;
    }

    set province(value: string) {
        this._province = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get county(): string {
        return this._county;
    }

    set county(value: string) {
        this._county = value;
    }

    get detailAddress(): string {
        return this._detailAddress;
    }

    set detailAddress(value: string) {
        this._detailAddress = value;
    }

    get longitude(): string {
        return this._longitude;
    }

    set longitude(value: string) {
        this._longitude = value;
    }

    get latitude(): string {
        return this._latitude;
    }

    set latitude(value: string) {
        this._latitude = value;
    }
}

export class NetworkManagementModel {
    /** 网络ID */
    private _netID: string;
    /** 网络详情信息 */
    private _netInfo: NetWorkInfo = new NetWorkInfo();
    /** 设备添加 */
    private _deviceAdd: Array<any>;
    /** 设备删除 */
    private _deviceDel: Array<any>;
    /** 交换机设备添加 */
    private _switchDeviceAdd: Array<any>;
    /** 交换机设备删除 */
    private _switchDeviceDel: Array<any>;
    /** ssid详情 */
    private _ssidInfo: Array<SsidInfo>;
    /** 无线电配置 */
    private _radio: AllRadioFreqModel;
    /** 探针配置 */
    private _probe: any;

    /** 网络配置 */
    public setNetInfo (id: string, name: string, type: number, province?: string, city?: string,
                       county?: string, detailAddress?: string) {
        this.netID = id;
        this.netInfo.netName = name;
        this.netInfo.netType = type;

        this.netInfo.province = province ? province : '';
        this.netInfo.city = city ? city : '';
        this.netInfo.county = county ? county : '';
        this.netInfo.detailAddress = detailAddress;
    }

    /** 配置无线电 */
    public setRadio(data: any) {
        this.radio.config2gStateID = data['channel2Enable'];
        this.radio.config2gChannelID = data['channel2'];
        this.radio.config2g11nChannelWidthID = data['channelWidth2'];
        this.radio.config2gPowerDbmID = data['power2'];

        this.radio.config5gStateID = data['channel5Enable'];
        this.radio.config5gChannelID = data['channel5'];
        this.radio.config5g11nChannelWidthID = data['channelWidth5'];
        this.radio.config5gPowerDbmID = data['power5'];

        this.radio.roamingInduction = data['roamingInduction'];
    }

    /** 配置探针管理 */
    public setProbe(data: any) {
        this.probe['probeInterval'] = data['interval'];
        this.probe['probeMessageType'] = data['messageType'];
        this.probe['probeStatus'] = data['probeEnable'];
        this.probe['probeServerIp'] = data['serverIP'];
        this.probe['probeServerPort'] = data['serverPort'];
    }

    /** 配置ssid */
    public setSsid(data: any) {
        for (let obj in data) {
            if (data[obj] != null) {
                this.ssidInfo[obj].ssidInfo.downSpeedLimit = data[obj]['downSpeedLimit'];
                this.ssidInfo[obj].ssidInfo.id = data[obj]['id'];
                this.ssidInfo[obj].ssidInfo.ipDistribution = data[obj]['ipDistribution'];
                this.ssidInfo[obj].ssidInfo.portalServer = data[obj]['portalServer'];
                this.ssidInfo[obj].ssidInfo.radiusServer = data[obj]['radiusServer'];
                this.ssidInfo[obj].ssidInfo.saftetyCertified = data[obj]['saftetyCertified'];
                this.ssidInfo[obj].ssidInfo.saftetyCertifiedKey = data[obj]['saftetyCertifiedKey'];

                this.ssidInfo[obj].ssidInfo.ssidName = data[obj]['ssidName'];
                this.ssidInfo[obj].ssidInfo.ssidStatus = data[obj]['ssidStatus'];
                this.ssidInfo[obj].ssidInfo.suppressSsid = data[obj]['suppressSsid'];
                this.ssidInfo[obj].ssidInfo.vpnAllow = data[obj]['vpnAllow'];
                this.ssidInfo[obj].ssidInfo.stationInsulate = data[obj]['stationInsulate'];

                this.ssidInfo[obj].ssidInfo.certification = data[obj]['certification'];

                this.ssidInfo[obj].ssidInfo.vlanId = data[obj]['vlanId'];
                this.ssidInfo[obj].ssidInfo.rf = data[obj]['rf'];

                this.ssidInfo[obj].ssidInfo.acl = data[obj]['acl'];
            }
        }
    }

    hasSameNoZeroVlanId(): boolean {
        let vlanIdList=[];
        this.ssidInfo.forEach(res=> {
            if(res.ssidStatus===true) {
                vlanIdList.push(res.ssidInfo.vlanId);
            }
        });
        for(let i in vlanIdList) {
            for(let j in vlanIdList) {
                if (vlanIdList[i] === vlanIdList[j] && i !== j && vlanIdList[i] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    get netID(): string {
        return this._netID;
    }

    set netID(value: string) {
        this._netID = value;
    }

    get netInfo(): NetWorkInfo {
        return this._netInfo;
    }

    set netInfo(value: NetWorkInfo) {
        this._netInfo = value;
    }


    get deviceAdd(): Array<any> {
        return this._deviceAdd;
    }

    set deviceAdd(value: Array<any>) {
        this._deviceAdd = value;
    }

    get deviceDel(): Array<any> {
        return this._deviceDel;
    }

    set deviceDel(value: Array<any>) {
        this._deviceDel = value;
    }


    get ssidInfo(): Array<SsidInfo> {
        return this._ssidInfo;
    }

    set ssidInfo(value: Array<SsidInfo>) {
        this._ssidInfo = value;
    }

    get radio(): AllRadioFreqModel {
        return this._radio;
    }

    set radio(value: AllRadioFreqModel) {
        this._radio = value;
    }

    get probe(): any {
        return this._probe;
    }

    set probe(value: any) {
        this._probe = value;
    }

    get switchDeviceAdd(): Array<any> {
        return this._switchDeviceAdd;
    }

    set switchDeviceAdd(value: Array<any>) {
        this._switchDeviceAdd = value;
    }

    get switchDeviceDel(): Array<any> {
        return this._switchDeviceDel;
    }

    set switchDeviceDel(value: Array<any>) {
        this._switchDeviceDel = value;
    }

    /** 保存数据 */
    getSaveData(): any {
        let ssidJson = [];

        for (let obj of this.ssidInfo) {
            let tmp = {};
            tmp['id'] = obj.ssidInfo.id;
            tmp['ssidName'] = obj.ssidInfo.ssidName;
            tmp['saftetyCertified'] = obj.ssidInfo.saftetyCertified;
            tmp['portalServer'] = obj.ssidInfo.portalServer;
            tmp['radiusServer'] = obj.ssidInfo.radiusServer;
            tmp['ipDistribution'] = obj.ssidInfo.ipDistribution;
            tmp['vpnAllow'] = obj.ssidInfo.vpnAllow;
            tmp['downSpeedLimit'] = obj.ssidInfo.downSpeedLimit;
            tmp['stationInsulate'] = obj.ssidInfo.stationInsulate;
            tmp['suppressSsid'] = obj.ssidInfo.suppressSsid;
            tmp['ssidStatus'] = obj.ssidStatus? 1:0;
            tmp['saftetyCertifiedKey'] = obj.ssidInfo.saftetyCertifiedKey;
            tmp['certification'] = obj.ssidInfo.certification;

            tmp['vlanId'] = obj.ssidInfo.vlanId;
            tmp['rf'] = obj.ssidInfo.rf;
            tmp['acl'] = obj.ssidInfo.acl;
            ssidJson.push(tmp);
        }
        return {
            'netInfo': {
                'netName': this.netInfo.netName,
                'netType': this.netInfo.netType,
                'province': this.netInfo.province,
                'city': this.netInfo.city,
                'county': this.netInfo.county,
                'detailAddress': this.netInfo.detailAddress,
                'longitude': this.netInfo.longitude,
                'latitude': this.netInfo.latitude
            },
            // 'netRf': {
            //     'config2gState': this.radio.config2gStateID,
            //     'config2gChannel': this.radio.config2gChannelID,
            //     'config2gPowerDbm': this.radio.config2gPowerDbmID,
            //     'config2g11nChannelWidth': this.radio.config2g11nChannelWidthID,
            //     'config5gState': this.radio.config5gStateID,
            //     'config5gChannel': this.radio.config5gChannelID,
            //     'config5gPowerDbm': this.radio.config5gPowerDbmID,
            //     'config5g11nChannelWidth': this.radio.config5g11nChannelWidthID,
            //     'radioFrequencyRoamInduction': this.radio.roamingInduction
            // },
            // 'netProbeConfigInfo': {
            //     'probeStatus': this.probe['probeStatus'],
            //     'probeServerIp': this.probe['probeServerIp'],
            //     'probeServerPort': this.probe['probeServerPort'],
            //     'probeInterval': this.probe['probeInterval'],
            //     'probeMessageType': this.probe['probeMessageType']
            // },
            'ssidInfoList': ssidJson,
            'addApIdList': this.deviceAdd === undefined ? [] : this.deviceAdd,
            'deleteApIdList': this.deviceDel === undefined ? [] : this.deviceDel,
            'addSwitchIdList': this.switchDeviceAdd === undefined ? [] : this.switchDeviceAdd,
            'deleteSwitchIdList': this.switchDeviceDel === undefined ? [] : this.switchDeviceDel
        };
    }
}
