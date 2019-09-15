import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class VersionTypeDropDownModel {

    /** 添加版本-版本类型 */
    private _dropDowns: Array<DropDownsInterface>;
    private _deviceType: Array<DropDownsInterface>;
    private _deviceModel: Array<DropDownsInterface>;
    private _switchDeviceModel: Array<DropDownsInterface>;
    private _uploadDeviceType: Array<DropDownsInterface>;
    private _uploadDeviceModel: Array<DropDownsInterface>;
    private _switchUploadDeviceModel: Array<DropDownsInterface>;

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }

    get deviceType(): Array<DropDownsInterface> {
        return this._deviceType;
    }

    set deviceType(value: Array<DropDownsInterface>) {
        this._deviceType = value;
    }

    get deviceModel(): Array<DropDownsInterface> {
        return this._deviceModel;
    }

    set deviceModel(value: Array<DropDownsInterface>) {
        this._deviceModel = value;
    }

    get uploadDeviceType(): Array<DropDownsInterface> {
        return this._uploadDeviceType;
    }

    set uploadDeviceType(value: Array<DropDownsInterface>) {
        this._uploadDeviceType = value;
    }

    get uploadDeviceModel(): Array<DropDownsInterface> {
        return this._uploadDeviceModel;
    }

    set uploadDeviceModel(value: Array<DropDownsInterface>) {
        this._uploadDeviceModel = value;
    }

    get switchDeviceModel(): Array<DropDownsInterface> {
        return this._switchDeviceModel;
    }

    set switchDeviceModel(value: Array<DropDownsInterface>) {
        this._switchDeviceModel = value;
    }

    get switchUploadDeviceModel(): Array<DropDownsInterface> {
        return this._switchUploadDeviceModel;
    }

    set switchUploadDeviceModel(value: Array<DropDownsInterface>) {
        this._switchUploadDeviceModel = value;
    }
}
