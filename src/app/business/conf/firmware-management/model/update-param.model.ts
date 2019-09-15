export class UpdateParamModel {

    /** AP ID */
    private _apVersionId: number;
    /** 选中更新固件ID数组 */
    private _apIdList: Array<number> = [];
    /** AP ID */
    private _switchVersionId: number;
    /** 选中更新固件ID数组 */
    private _switchIdList: Array<number> = [];

    get apVersionId(): number {
        return this._apVersionId;
    }

    set apVersionId(value: number) {
        this._apVersionId = value;
    }

    get apIdList(): Array<number> {
        return this._apIdList;
    }

    set apIdList(value: Array<number>) {
        this._apIdList = value;
    }

    public toAPString() {
        return {
            'apVersionId': this._apVersionId || null ,
            'apIdList': this._apIdList || []
        };
    }

    public toSwitchString() {
        return {
            'switchVersionId': this._switchVersionId || null ,
            'switchIdList': this._switchIdList || []
        };
    }

    get switchVersionId(): number {
        return this._switchVersionId;
    }

    set switchVersionId(value: number) {
        this._switchVersionId = value;
    }

    get switchIdList(): Array<number> {
        return this._switchIdList;
    }

    set switchIdList(value: Array<number>) {
        this._switchIdList = value;
    }
}
