import {ReceiveModel} from "./receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

export class WorkShiftResolverModel {
    /**角色列表数据*/
    private _workShiftList: any;
    /**构造函数
     *      1. 从activatedRoute中获取数据 即从路由中获取数据
     * */
    constructor(activatedRoute: ActivatedRoute, private router: Router, public _message: NzMessageService) {
        activatedRoute.data.subscribe(
            ( data:{workShiftList: ReceiveModel} ) => {
                if (data.workShiftList["code"] === 0) {
                    let tmpArray: Array<any> = new Array<any>();
                    data.workShiftList['result'].forEach(glt=> {
                        let tmp= {id:glt.id,name:glt.flightName};
                        tmpArray.push(tmp);
                    });
                    this._workShiftList=tmpArray;
                } else {
                    this._message.create('info', "暂无班次，管理考勤组前，请先新建班次！");
                    this.router.navigateByUrl('/work-shift-management');
                }
            }
        );
    }
    /**获取角色列表数据*/
    get workShiftList(): any{
        return this._workShiftList;
    }
    /**设置角色列表数据*/
    set workShiftList(value: any) {
        this._workShiftList = value;
    }
}
