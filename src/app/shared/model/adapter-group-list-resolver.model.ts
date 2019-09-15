import {ReceiveModel} from "./receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";
import {NzMessageService} from "ng-zorro-antd";

export class AdapterGroupListResolverModel {
    /**网络列表数据 接口*/
    private _adapterGroupList: Array<any>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute, private router : Router, public _message: NzMessageService) {
        activatedRoute.data.subscribe(
            ( data:{adapterGroupList: ReceiveModel} ) => {
                if (data.adapterGroupList.code === 0) {
                    if((!data.adapterGroupList.result)||data.adapterGroupList.result.length===0) {
                        this._message.create('info', "暂无适配器组管理数据，请先新建适配器组管理！");
                        this.router.navigateByUrl('/adapter-group-management');
                    } else {
                        this.adapterGroupList = data.adapterGroupList.result;
                    }
                } else {
                    this._message.create('info', "暂无适配器组管理数据，请先新建适配器组管理！");
                    this.router.navigateByUrl('/adapter-group-management');
                }
            }
        );
    }

    /**获取网络列表数据*/
    get adapterGroupList(): Array<any> {
        return this._adapterGroupList;
    }
    /**设置网络列表数据*/
    set adapterGroupList(value: Array<any>) {
        this._adapterGroupList = value;
    }
}
