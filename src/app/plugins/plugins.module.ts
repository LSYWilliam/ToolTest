import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ChartModule } from 'angular2-highcharts';
/**登录表单 组件*/
import { LoginFormComponent } from './component/login-from/login-form.component';
/**页面头部 组件*/
import { HeaderLayoutComponent } from './component/header-layout/header-layout.component';
/**介绍使用 组件*/
import { InstructionsUserComponent } from './component/instructions-use/instructions-user.component';
/**API使用 组件*/
import { ApiUserComponent } from './component/api-use/api-user.component';
/**card 组件*/
import { CardComponent } from './component/card/card.component';
/**table 组件*/
import { TableComponent } from './component/table/table.component';
/**edit-table 组件*/
import { EditTableComponent } from './component/edit-table/edit-table.component';
import { IconComponent } from './component/table/icon/icon.component';
import { LinkComponent } from './component/table/link/link.component';
import { DeleteComponent } from './component/table/delete/delete.component';
import { ApLinkComponent } from './component/table/apLink/ap-link.component';
import { VersionLinkComponent } from './component/table/versionLink/version-link.component';
import { DisabledComponent } from './component/table/disabled/disabled.component';
import { NetLinkComponent } from './component/table/netLink/net-link.component';
import { FirmwareComponent } from "./component/table/firmware/firmware.component";
import { UpdateComponent } from "./component/table/update/update.component";
import { FirmwareStatusComponent } from "./component/table/firmwareStatus/firmware-status.component";
/** tree-table树形表格组件 */
import { TreeTableComponent } from './component/tree-table/tree-table.component';
import { ThresholdComponent } from './component/tree-table/threshold/threshold.component';
import { StatusComponent } from './component/tree-table/status/status.component';
import { EditComponent } from './component/tree-table/edit/edit.component';
import { ApInputComponent } from './component/tree-table/apInput/apInput.component';
import { HighchartsComponent } from './component/highcharts/highcharts.component';
import {LayoutDirective} from "./directive/layout.directive";
import { OperationComponent } from './component/table/operation/operation.component';
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import {CommonLinkComponent} from "./component/table/commonLink/commonLink.component";
import {OperateComponent} from "./component/table/operate/operate.component";
import {InputRequiredDirective} from "./directive/input-required.directive";
import {AttentionComponent} from "./component/table/attention/attention.component";
import {UserOfflineComponent} from "./component/table/userOffline/user-offline.component";
import {EditAndDelComponent} from "./component/table/editAndDel/edit-and-del.component";
import {IconNumberComponent} from "./component/table/iconNumber/iconNumber.component";
import {WorkOrderOperateComponent} from "./component/table/workOrderOperate/workOrderOperate.component";
import {NewDropDownComponent} from "./component/newdropdown/newdropdown.component";
import {ZorroPageTableComponent} from "./component/zorro-page-table/zorro-page-table.component";


declare let require: any;

export function highchartsFactory() {
    return require('highcharts/highstock');

}

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            ChartModule,
            AgGridModule.withComponents(
                [
                    IconComponent,
                    LinkComponent,
                    DeleteComponent,
                    ThresholdComponent,
                    StatusComponent,
                    EditComponent,
                    ApInputComponent,
                    ApLinkComponent,
                    VersionLinkComponent,
                    DisabledComponent,
                    NetLinkComponent,
                    FirmwareComponent,
                    UpdateComponent,
                    OperationComponent,
                    UserOfflineComponent,
                    FirmwareStatusComponent,
                    CommonLinkComponent,
                    OperateComponent,
                    AttentionComponent,
                    EditAndDelComponent,
                    IconNumberComponent,
                    WorkOrderOperateComponent
                ]
            ),
            NgZorroAntdModule.forRoot(),
            ChartModule
        ],
    declarations:
        [
            LoginFormComponent,
            HeaderLayoutComponent,
            InstructionsUserComponent,
            ApiUserComponent,
            CardComponent,
            TableComponent,
            EditTableComponent,
            IconComponent,
            LinkComponent,
            DeleteComponent,
            ApLinkComponent,
            OperationComponent,
            FirmwareStatusComponent,
            VersionLinkComponent,
            DisabledComponent,
            NetLinkComponent,
            FirmwareComponent,
            UpdateComponent,
            TreeTableComponent,
            ThresholdComponent,
            StatusComponent,
            EditComponent,
            ApInputComponent,
            EditAndDelComponent,
            IconNumberComponent,
            WorkOrderOperateComponent,
            // highcharts图表
            HighchartsComponent,
            LayoutDirective,
            CommonLinkComponent,
            OperateComponent,
            UserOfflineComponent,
            AttentionComponent,
            NewDropDownComponent,
            ZorroPageTableComponent,
            InputRequiredDirective
        ],
    exports:
    [
        LoginFormComponent,
        HeaderLayoutComponent,
        InstructionsUserComponent,
        ApiUserComponent,
        CardComponent,
        TableComponent,
        EditTableComponent,
        // tree-table
        TreeTableComponent,
        // highcharts图表
        HighchartsComponent,
        LayoutDirective,
        CommonLinkComponent,
        OperateComponent,
        AttentionComponent,
        EditAndDelComponent,
        NewDropDownComponent,
        ZorroPageTableComponent,
        InputRequiredDirective
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ]
})

/** 共享模块 */
export class PluginsModule { }
