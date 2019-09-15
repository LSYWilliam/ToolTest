import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {RequestArgs} from '../../../../shared/model/request-args';
import {TableComponent} from '../../../../plugins/component/table/table.component';
import {InstallRecordService} from "../service/install-record.service";
import {HeaderDataModel} from "../model/header-data.model";
import {FilterInstallRecord} from "../model/filterInstallRecord";

/**
 * 安装记录
 * @class InstallRecordComponent
 */
@Component
({
    selector: 'app-install-record',
    templateUrl: './install-record.component.html',
    styleUrls: ['./install-record.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class InstallRecordComponent extends InstallRecordService implements OnInit, OnDestroy {

    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 表格子组件 */
    @ViewChild(TableComponent) child: TableComponent;
    /** http请求头部 */
    public requestArgs: RequestArgs = new RequestArgs();
    /**表格静态数据 实体类*/
    public headerDataModel: HeaderDataModel = new HeaderDataModel();
    /**筛选静态数据 实体类*/
    public filterInstallRecord: FilterInstallRecord = new FilterInstallRecord();

    /** 筛选获取安装记录 */
    getInstallFliterData() {
        console.log(this.filterInstallRecord.getFliterInstallRecord());
        this.getInstallRecordTableData(this.filterInstallRecord.getFliterInstallRecord());
    }

    /** 清空筛选条件 */
    clearInstallFliter() {
        this.filterInstallRecord.getClear();
        this.getInstallRecordTableData(this.filterInstallRecord.getFliterInstallRecord());
    }


    /**动态获取表格数据*/
    getData() {
        this.getBusinessListData();
        this.getInstallRecordTableData(this.filterInstallRecord.getFliterInstallRecord());
    }

    /**
     * 方法初始化
     * @description
     *      1、设置http请求头部
     *      2、设置显示固件管理，其余全部隐藏
     *      3、设置组件类型
     *      4、设置模态框不显示
     *      5、获取网络下拉框默认ID NAME
     *      6、执行方法并获取动态数据
     * */
    ngOnInit() {
        this.windowHeight = window.innerHeight-300;
        this.getData();
    }

    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {

    }

}
