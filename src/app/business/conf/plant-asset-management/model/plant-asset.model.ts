import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
/**
 * 设备资产管理平台 数据实体类
 * */
export class PlantAssetModel {
    /**设备总台数*/
    private _allDevice: number;
    /**已申购的设备台数*/
    private _useDevice: number;
    /**设备资产管理平台table表格数据*/
    private _tableData: any;
    /**所属商家下拉框列表数据 接口*/
    private _dropDowns: Array<DropDownsInterface>;
    /**获取所属商家下拉框列表数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置所属商家下拉框列表数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
    /**获取设备资产管理平台table表格数据*/
    get tableData(): any {
        return this._tableData;
    }
    /**设置设备资产管理平台table表格数据*/
    set tableData(value: any) {
        this._tableData = value;
    }
    /**获取设备总台数*/
    get allDevice(): number {
        return this._allDevice;
    }
    /**设置设备总台数*/
    set allDevice(value: number) {
        this._allDevice = value;
    }
    /**获取已申购的设备台数*/
    get useDevice(): number {
        return this._useDevice;
    }
    /**设置已申购的设备台数*/
    set useDevice(value: number) {
        this._useDevice = value;
    }
}
