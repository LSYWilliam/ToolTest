import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class VersionTypeResolverModel {

    /**楼层列表数据 接口*/
    private _versionType: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {

        activatedRoute.data.subscribe(
            ( data:{versionType: ReceiveModel} ) => {
                if (data.versionType.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    data.versionType.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res, name: res});
                        }
                    );
                    this.versionType = tmp;
                }
            }
        );
    }

    /**获取楼层列表数据*/
    get versionType(): Array<DropDownsInterface> {
        return this._versionType;
    }

    set versionType(value: Array<DropDownsInterface>) {
        this._versionType = value;
    }
}
