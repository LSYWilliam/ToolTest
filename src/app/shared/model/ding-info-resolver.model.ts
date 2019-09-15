import {ActivatedRoute, Router} from "@angular/router";
/**
 * 商家列表 Resolve 实体类
 * */
export class DingInfoResolverModel {
    /**商家列表数据 接口*/
    private _businessInfo: {};
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data ) => {
                console.log(data);
                if (data.businessInfo.code === 0) {
                    this._businessInfo = data.businessInfo.result;
                }
            }
        );
    }

    get businessInfo(): {} {
        return this._businessInfo;
    }

    set businessInfo(value: {}) {
        this._businessInfo = value;
    }
}
