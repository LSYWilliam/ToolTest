import {DropDownsInterface} from "../../dropdown/model/dropdowns.model";
import {ProbeConf} from "../../../static-data/probe-conf";

export class GlobalProbeConfModel {
    /**全网探针配置状态是开启还是关闭*/
    private _probeEnable: boolean;
    /**报文格式下拉框接口*/
    private _messageType: Array<DropDownsInterface>;

    constructor() {
        const object = ProbeConf();
        if (object.hasOwnProperty("messageType")) {
            this.messageType = this.filterData(object["messageType"]);
        }
    }
    /**获取全网探针配置状态是开启还是关闭*/
    get probeEnable(): boolean {
        return this._probeEnable;
    }
    /**设置全网探针配置状态是开启还是关闭*/
    set probeEnable(value: boolean) {
        this._probeEnable = value;
    }
    /**获取全网探针配置报文格式类型*/
    get messageType(): Array<DropDownsInterface> {
        return this._messageType;
    }
    /**设置全网探针配置报文格式类型*/
    set messageType(value: Array<DropDownsInterface>) {
        this._messageType = value;
    }
    /**json格式数据转换
     *      1.ProbeConf文件中的报文格式进行转化
     *      2.举个例子，将{0:aa}转换成{id:0,name:aa}
     *      3.将转换后的json放到数组中
     *
     * */
    protected filterData(data: any): Array<DropDownsInterface> {
         let dropDowns : Array<DropDownsInterface> = [];
         for (let obj in data) {
             dropDowns.push(<DropDownsInterface> {id: obj, name: data[obj]});
         }
         return dropDowns;
    }
}
