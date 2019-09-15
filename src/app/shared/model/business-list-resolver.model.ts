import {ReceiveModel} from "./receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";
/**
 * 商家列表 Resolve 实体类
 * */
export class BusinessListResolverModel {
    /**商家列表数据 接口*/
    private _businessList: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.data.subscribe(
            ( data:{businessList: ReceiveModel} ) => {
                if (data.businessList.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    data.businessList.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res["businessId"], name: res["businessName"]});
                        }
                    );
                    this._businessList = tmp;
                } else {
                    this.router.navigateByUrl('/business-list');
                }
            }
        );
    }
    /**获取商家列表数据*/
    get businessList(): Array<DropDownsInterface> {
        return this._businessList;
    }
    /**设置商家列表数据*/
    set businessList(value: Array<DropDownsInterface>) {
        this._businessList = value;
    }
}
