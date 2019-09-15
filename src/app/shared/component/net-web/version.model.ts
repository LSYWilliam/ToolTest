/**
 * 固件版本实体类
 * @class VersionModel
 */
export class VersionModel {
    /**固件版本 版本ID*/
    private _versionId: number;
    /**固件版本 版本类型*/
    private _versionName: string;
    /**固件版本 版本名称*/
    private _version: string;
    /**固件版本 创建时间*/
    private _createTime: string;
    /**固件版本 设备名称*/
    private _deviceName: string;
    /**获取固件版本 版本ID*/
    get versionId(): number {
        return this._versionId;
    }
    /**设置固件版本 版本ID*/
    set versionId(value: number) {
        this._versionId = value;
    }
    /**获取固件版本 版本类型*/
    get versionName(): string {
        return this._versionName;
    }
    /**设置固件版本 版本类型*/
    set versionName(value: string) {
        this._versionName = value;
    }
    /**获取固件版本 版本名称*/
    get version(): string {
        return this._version;
    }
    /**设置固件版本 版本名称*/
    set version(value: string) {
        this._version = value;
    }
    /**获取固件版本 创建时间*/
    get createTime(): string {
        return this._createTime;
    }
    /**设置固件版本 创建时间*/
    set createTime(value: string) {
        this._createTime = value;
    }
    /**获取固件版本 设备名称*/
    get deviceName(): string {
        return this._deviceName;
    }
    /**设置固件版本 设备名称*/
    set deviceName(value: string) {
        this._deviceName = value;
    }


}
