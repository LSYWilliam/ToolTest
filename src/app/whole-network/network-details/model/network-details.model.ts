import { NetDetailsDataModel } from './net-details-data.model';
import { NetApDetailsModel } from "./net-ap-details.model";

export class NetworkDetailsModel {

    /** 网络名称 */
    private _netName: any;
    /** 楼层数据 */
    private _floorData: any;
    /** 表格数据 */
    private _tableData: any;
    /** 网络流速 */
    private _netDetailsFlowData: NetDetailsDataModel = new NetDetailsDataModel();
    /** AP详情 */
    private _netApDetailsModel: NetApDetailsModel = new NetApDetailsModel();

    get netName(): any {
        return this._netName;
    }

    set netName(value: any) {
        this._netName = value;
    }

    get floorData(): any {
        return this._floorData;
    }

    set floorData(value: any) {
        this._floorData = value;
    }

    get tableData(): any {
        return this._tableData;
    }

    set tableData(value: any) {
        this._tableData = value;
    }

    get netDetailsFlowData(): NetDetailsDataModel {
        return this._netDetailsFlowData;
    }

    set netDetailsFlowData(value: NetDetailsDataModel) {
        this._netDetailsFlowData = value;
    }

    get netApDetailsModel(): NetApDetailsModel {
        return this._netApDetailsModel;
    }

    set netApDetailsModel(value: NetApDetailsModel) {
        this._netApDetailsModel = value;
    }

}
