import {ReceiveModel} from "./receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DropDownsInterface} from "../component/dropdown/model/dropdowns.model";

export class NetworkListResolverModel {
    /**网络列表数据 接口*/
    private _networkList: Array<DropDownsInterface>;
    /**constructor构造函数
     *      1.activatedRoute 服务中的路由数据
     * */
    constructor(activatedRoute: ActivatedRoute, private router : Router) {
        activatedRoute.data.subscribe(
            ( data:{networkList: ReceiveModel} ) => {
                if (data.networkList.code === 0) {
                    let networkList: Array<DropDownsInterface> = [];
                    data.networkList.result.forEach(
                        res => {
                            networkList.push(<DropDownsInterface>{id: res['netId'], name: res['netName']});
                        }
                    );
                    this.networkList = networkList;
                } else {
                    this.router.navigateByUrl('/network-management');
                }
            }
        );
    }

    /**获取网络列表数据*/
    get networkList(): Array<DropDownsInterface> {
        return this._networkList;
    }
    /**设置网络列表数据*/
    set networkList(value: Array<DropDownsInterface>) {
        this._networkList = value;
    }
}
