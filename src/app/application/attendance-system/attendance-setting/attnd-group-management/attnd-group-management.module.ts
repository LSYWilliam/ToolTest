import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttndGroupManagementComponent} from "./component/attnd-group-management.component";
import {AttndGroupManagementRoutingModule} from "./attnd-group-management-routing.module";
import {SharedModule} from "../../../../shared/shared.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddStaffModalComponent } from './component/add-staff-modal/add-staff-modal.component';
import {TwoExchangeStaffTableComponent} from "./component/two-exchange-staff-table/two-exchange-staff-table.component";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {DepartmentManagementModule} from "../../../../business/conf/organizationManagement/department-management/department-management.module";

@NgModule({
    imports: [
        CommonModule,
        AttndGroupManagementRoutingModule,
        SharedModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        DepartmentManagementModule,
        PluginsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AttndGroupManagementComponent,
        AddStaffModalComponent,
        TwoExchangeStaffTableComponent
    ],
    entryComponents: [
        AddStaffModalComponent
    ]
})
export class AttndGroupManagementModule {
}
