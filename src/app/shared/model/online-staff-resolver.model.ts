import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";

export class OnlineStaffResolverModel {
    /**在线用户数据*/
    private _onlineUsersData: any;
    /**构造函数
     *      1. 从activatedRoute中获取数据 即从路由中获取数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{onlineUsersData: ReceiveModel} ) => {
                if(data.onlineUsersData.code===0) {
                    if (data.onlineUsersData.result[0]["total"] > 0) {
                        this._onlineUsersData=data.onlineUsersData.result[0];
                    }
                }
            }
        );
    }
    /**获取角色列表数据*/
    get onlineUsersData(): any{
        return this._onlineUsersData;
    }
    /**设置角色列表数据*/
    set onlineUsersData(value: any) {
        this._onlineUsersData = value;
    }
}
