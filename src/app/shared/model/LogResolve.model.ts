import {ReceiveModel} from "./receive.model";
import {ActivatedRoute} from "@angular/router";

export class LogResolveModel {
    /**角色列表数据*/
    private _roleList: any;
    /**构造函数
     *      1. 从activatedRoute中获取数据 即从路由中获取数据
     * */
    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.data.subscribe(
            ( data:{role: ReceiveModel} ) => {
                if (data.role["code"] === 0) {
                    this._roleList=data.role['result'];
                }
            }
        );
    }
    /**获取角色列表数据*/
    get roleList(): any{
        return this._roleList;
    }
    /**设置角色列表数据*/
    set roleList(value: any) {
        this._roleList = value;
    }
}
