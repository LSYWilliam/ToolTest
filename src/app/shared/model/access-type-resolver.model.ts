import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class AccessTypeResolverModel {
    /**角色列表数据*/
    private _accessTypeList: Array<DropDownsInterface>;
    /**构造函数
     *      1. 从activatedRoute中获取数据 即从路由中获取数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{accessTypeList: ReceiveModel} ) => {
                if (data.accessTypeList["code"] === 0) {
                    let tmp = [];
                    tmp.push({
                        id :"",
                        name :"选择全部"
                    });
                    data.accessTypeList.result.forEach(glt=> {
                        tmp.push({
                            id :glt.accessTypeNo,
                            name :glt.accessTypeName
                        });
                    });
                    this.accessTypeList = tmp;
                }
            }
        );
    }
    /**获取角色列表数据*/
    get accessTypeList(): any {
        return this._accessTypeList;
    }
    /**设置角色列表数据*/
    set accessTypeList(value: any) {
        this._accessTypeList = value;
    }
}
