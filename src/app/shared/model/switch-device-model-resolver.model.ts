import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class SwitchDeviceModelResolverModel {

    /**楼层列表数据 接口*/
    private _switchDeviceModel: Array<DropDownsInterface>;
    private _switchDeviceModel2: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {

        activatedRoute.data.subscribe(
            ( data:{switchDeviceModel: ReceiveModel} ) => {
                if (data.switchDeviceModel.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    let tmp2: Array<DropDownsInterface> = [];
                    tmp.push(<DropDownsInterface> {id: undefined, name: '请选择型号'});
                    tmp2.push(<DropDownsInterface> {id: undefined, name: '请选择型号'});
                    data.switchDeviceModel.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res.modelId, name: res.deviceModel});
                            tmp2.push(<DropDownsInterface> {id: res.modelId, name: res.deviceModel});
                        }
                    );
                    this.switchDeviceModel = tmp;
                    this.switchDeviceModel2 = tmp2;
                    console.log(this.switchDeviceModel);
                    console.log(this.switchDeviceModel2);
                } else {
                    this.switchDeviceModel = [];
                    this.switchDeviceModel2 = [];
                }
            }
        );
    }
    /**获取楼层列表数据*/
    get switchDeviceModel(): Array<DropDownsInterface> {
        return this._switchDeviceModel;
    }

    set switchDeviceModel(value: Array<DropDownsInterface>) {
        this._switchDeviceModel = value;
    }

    get switchDeviceModel2(): Array<DropDownsInterface> {
        return this._switchDeviceModel2;
    }

    set switchDeviceModel2(value: Array<DropDownsInterface>) {
        this._switchDeviceModel2 = value;
    }
}
