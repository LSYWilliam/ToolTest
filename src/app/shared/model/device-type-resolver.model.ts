import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class DeviceTypeResolverModel {

    /**楼层列表数据 接口*/
    private _deviceType: Array<DropDownsInterface>;
    private _deviceType2: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{deviceType: ReceiveModel} ) => {
                if (data.deviceType.code === 0) {
                    console.log(data.deviceType);
                    let tmp: Array<DropDownsInterface> = [];
                    let tmp2: Array<DropDownsInterface> = [];
                    tmp.push(<DropDownsInterface> {id: undefined, name: '请选择类型'});
                    tmp2.push(<DropDownsInterface> {id: undefined, name: '请选择类型'});
                    data.deviceType.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res.type, name: res.typeName});
                            tmp2.push(<DropDownsInterface> {id: res.type, name: res.typeName});
                        }
                    );
                    this.deviceType = tmp;
                    this.deviceType2 = tmp2;
                }
            }
        );
    }
    /**获取楼层列表数据*/

    get deviceType(): Array<DropDownsInterface> {
        return this._deviceType;
    }

    set deviceType(value: Array<DropDownsInterface>) {
        this._deviceType = value;
    }

    get deviceType2(): Array<DropDownsInterface> {
        return this._deviceType2;
    }

    set deviceType2(value: Array<DropDownsInterface>) {
        this._deviceType2 = value;
    }

}
