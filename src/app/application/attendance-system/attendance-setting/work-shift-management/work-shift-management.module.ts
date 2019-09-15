import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkShiftManagementRoutingModule} from "./work-shift-management-routing.module";
import {WorkShiftManagementComponent} from "./component/work-shift-management.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SharedModule} from "../../../../shared/shared.module";
import { WorkShiftModalComponent } from './component/work-shift-modal/work-shift-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PluginsModule} from "../../../../plugins/plugins.module";

@NgModule({
    imports: [
        CommonModule,
        WorkShiftManagementRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        ReactiveFormsModule,
        PluginsModule
    ],
    declarations: [
        WorkShiftManagementComponent,
        WorkShiftModalComponent
    ],
    entryComponents: [
        WorkShiftModalComponent
    ]
})
export class WorkShiftManagementModule {
}
