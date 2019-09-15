import { NetworkOverviewInfoModel } from './network-overview-info.model';

export class NetworkOverviewModel {

    /** 总网概览 */
    private _networkOverviewInfoModel: NetworkOverviewInfoModel = new NetworkOverviewInfoModel();
    /** 关注网络 */
    private _focusWeb: any;
    /** 网络列表 */
    private _tableData: any;

    get networkOverviewInfoModel(): NetworkOverviewInfoModel {
        return this._networkOverviewInfoModel;
    }

    set networkOverviewInfoModel(value: NetworkOverviewInfoModel) {
        this._networkOverviewInfoModel = value;
    }

    get focusWeb(): any {
        return this._focusWeb;
    }

    set focusWeb(value: any) {
        this._focusWeb = value;
    }

    get tableData(): any {
        return this._tableData;
    }

    set tableData(value: any) {
        this._tableData = value;
    }
}
