import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

export class DeviceManagementModel {
    /**下拉框接口*/
    private _dropDowns : Array<DropDownsInterface>;
    /**设备管理列表数据*/
    private _deviceManagementTableData: any;
    /**获取下拉框接口数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置下拉框接口数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
    /**获取设备管理列表数据*/
    get deviceManagementTableData(): any {
        return this._deviceManagementTableData;
    }
    /**设置设备管理列表数据*/
    set deviceManagementTableData(value: any) {
        this._deviceManagementTableData = value;
    }
}
