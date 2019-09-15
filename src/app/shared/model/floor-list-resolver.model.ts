import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class FloorListResolverModel {
    /**楼层列表数据 接口*/
    private _floor: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{networkFloorList: ReceiveModel} ) => {
                if (data.networkFloorList.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    data.networkFloorList.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res, name: res});
                        }
                    );
                    this.floor = tmp;
                }
            }
        );
    }
    /**获取楼层列表数据*/
    get floor(): Array<DropDownsInterface> {
        return this._floor;
    }
    /**设置楼层列表数据*/
    set floor(value: Array<DropDownsInterface>) {
        this._floor = value;
    }
}
