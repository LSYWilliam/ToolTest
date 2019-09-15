import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class NetworkStaticDataModel {
    /** 基础信息-网络类型下拉框 */
    private _netTypeDropDown: Array<DropDownsInterface>;
    /** 下拉框默认数据(好像没有用到) */
    private _netTypeInfo: any;
    /** 下拉框默认数据 */
    private _typeDefaultData: string;

    /**
     * 构造方法
     * @description
     *      初始化网络类型数据
     **/
    constructor() {
        this.netTypeInfo = {'0': 'AP组网', '1': '交换机组网', '2': 'AP+交换机组网'};
        this.netTypeDropDown = [{id:'0', name: 'AP组网'}, {id:'1', name: '交换机组网'}, {id:'2', name: 'AP+交换机组网'}];
    }

    public setDefaultData(id: string) {
        this.typeDefaultData = this.netTypeInfo[id];
    }

    get netTypeDropDown(): Array<DropDownsInterface> {
        return this._netTypeDropDown;
    }

    set netTypeDropDown(value: Array<DropDownsInterface>) {
        this._netTypeDropDown = value;
    }

    get netTypeInfo(): any {
        return this._netTypeInfo;
    }

    set netTypeInfo(value: any) {
        this._netTypeInfo = value;
    }

    get typeDefaultData(): string {
        return this._typeDefaultData;
    }

    set typeDefaultData(value: string) {
        this._typeDefaultData = value;
    }
}
