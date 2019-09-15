export class NameListModel {
    /**SSID的id值*/
    private _ssid: number;
    /**SSID的类型(黑名单还是白名单)值*/
    private _type: number;
    /**每一条名单列表的id*/
    private _id: number;
    /**SSID的mac地址值*/
    private _mac: string;
    /**SSID的备注值*/
    private _note: string;

    constructor(ssid?: number, type?: number){
        this.ssid = ssid;
        this.type = type;
    }
    /**获取点击模态框确定按钮，向后台请求的数据*/
    public getData(type: number) {
        let id = type === 1 ? null : this.id;

        return [{
            'ssidId' : this.ssid,
            'mac': this.mac,
            'type': this.type,
            'note': this.note,
            'id': id
        }]
    }
    /**获取SSID的id值*/
    get ssid(): number {
        return this._ssid;
    }
    /**设置SSID的id值*/
    set ssid(value: number) {
        this._ssid = value;
    }
    /**获取SSID的类型(黑名单还是白名单)值*/
    get type(): number {
        return this._type;
    }
    /**设置SSID的类型(黑名单还是白名单)值*/
    set type(value: number) {
        this._type = value;
    }
    /**获取每一条名单列表的id*/
    get id(): number {
        return this._id;
    }
    /**设置每一条名单列表的id*/
    set id(value: number) {
        this._id = value;
    }
    /**获取SSID的mac地址值*/
    get mac(): string {
        return this._mac;
    }
    /**设置SSID的mac地址值*/
    set mac(value: string) {
        this._mac = value;
    }
    /**获取SSID的备注值*/
    get note(): string {
        return this._note;
    }
    /**设置SSID的备注值*/
    set note(value: string) {
        this._note = value;
    }
}
