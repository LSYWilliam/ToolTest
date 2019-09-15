import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {Injectable} from "@angular/core";
import {PlantAssetModel} from "../model/plant-asset.model";
import {PlantTableModel} from "../model/plant-table.model";
import {Router} from "@angular/router";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

@Injectable()
export class PlantAssetManagementService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**设备资产管理平台 数据实体类*/
    public plantAssetModel: PlantAssetModel = new PlantAssetModel();

    constructor(private http: HttpClientService,public router: Router) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getBusinessList();
    }
    /**获取 模态框中 商家下拉框列表的数据*/
    protected getBusinessList() {
        this.requestArgs.url = '/api/v1/businesses/all';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    res.result.forEach(
                        res => {
                            tmp.push(<DropDownsInterface> {id: res["businessId"], name: res["businessName"]});
                        }
                    );
                    this.plantAssetModel.dropDowns = tmp;
                } else {
                    this.router.navigateByUrl('/business-list');
                }
            }
        )
    }
    /**获取 ap设备的总台数和已申购的台数*/
    protected getApUseInfo() {
        this.requestArgs.url = '/api/v1/ap_info/use_info';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.plantAssetModel.allDevice = res.result['deviceNum'];
                    this.plantAssetModel.useDevice = res.result['useDeviceNum'];
                }
            }
        )
    }
    /**获取 设备资产管理平台的 table表格的数据*/
    protected getTableData() {
        this.requestArgs.url = '/api/v1/ap_info';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                console.log(res);
                if (res.code === 0) {
                    let tmp: any = [];
                    for (let obj of res.result) {
                        tmp.push(new PlantTableModel(obj).toString());
                    }
                    this.plantAssetModel.tableData = res.result;
                } else if (res.code === 9) {
                    this.plantAssetModel.tableData = [];
                    this.plantAssetModel.allDevice = 0;
                    this.plantAssetModel.useDevice = 0;
                }
            }
        )
    }
}
