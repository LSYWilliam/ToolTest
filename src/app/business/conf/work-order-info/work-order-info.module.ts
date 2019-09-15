import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {InstallRecordDetailRoutingModule, InstallRecordRoutingModule, WorkOrderInfoRoutingModule} from './work-order-info-routing.module';
import {InstallRecordComponent} from './component/install-record.component';
import {InstallRecordService} from "./service/install-record.service";
import {InstallRecordDetailService, WorkOrderInfoService} from "./service/work-order-info.service";
import {InstallRecordDetailComponent, WorkOrderInfoComponent} from "./component/work-order-info.component";


@NgModule({
    imports: [
        CommonModule,
        WorkOrderInfoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule,
        SharedModule
    ],
    providers: [ WorkOrderInfoService ],
    declarations: [ WorkOrderInfoComponent ]
})

export class WorkOrderInfoModule { }
