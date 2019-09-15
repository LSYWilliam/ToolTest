import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {WorkOrderManageRoutingModule} from './work-order-manage-routing.module';
import {WorkOrderManageComponent} from './component/work-order-manage.component';
import {WorkOrderManageService} from './service/work-order-manage.service';
import {WorkOrderModalComponent} from "./component/work-order-modal/work-order-modal.component";

@NgModule({
    imports: [
        CommonModule,
        WorkOrderManageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule,
        SharedModule
    ],
    providers: [ WorkOrderManageService ],
    declarations: [
        WorkOrderManageComponent,
        WorkOrderModalComponent
    ],
    entryComponents: [
        WorkOrderModalComponent
    ]
})

export class WorkOrderManageModule { }
