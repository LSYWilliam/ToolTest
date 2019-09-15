import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class DeviceModelResolverModel {

    /**楼层列表数据 接口*/
    private _deviceModel: Array<DropDownsInterface>;
    private _deviceModel2: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {

        activatedRoute.data.subscribe(
            ( data:{deviceModel: ReceiveModel} ) => {
                if (data.deviceModel.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    let tmp2: Array<DropDownsInterface> = [];
                    tmp.push(<DropDownsInterface> {id: undefined, name: '请选择型号'});
                    tmp2.push(<DropDownsInterface> {id: undefined, name: '请选择型号'});
                    data.deviceModel.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res.modelId, name: res.deviceModel});
                            tmp2.push(<DropDownsInterface> {id: res.modelId, name: res.deviceModel});
                        }
                    );
                    this.deviceModel = tmp;
                    this.deviceModel2 = tmp2;
                    console.log(this.deviceModel);
                    console.log(this.deviceModel2);
                } else {
                    this.deviceModel = [];
                    this.deviceModel2 = [];
                }
            }
        );
    }
    /**获取楼层列表数据*/

    get deviceModel(): Array<DropDownsInterface> {
        return this._deviceModel;
    }

    set deviceModel(value: Array<DropDownsInterface>) {
        this._deviceModel = value;
    }

    get deviceModel2(): Array<DropDownsInterface> {
        return this._deviceModel2;
    }

    set deviceModel2(value: Array<DropDownsInterface>) {
        this._deviceModel2 = value;
    }
}
