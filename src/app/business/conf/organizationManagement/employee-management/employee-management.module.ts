import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeManagementComponent} from "./component/employee-management.component";
import {EmployeeManagementService} from "./service/employee-management.service";
import {EmployeeManagementRoutingModule} from "./employee-management-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import { EmpMgmtModalComponent } from './component/emp-mgmt-modal/emp-mgmt-modal.component';
import { EmpMgmtSearchComponent } from './component/emp-mgmt-search/emp-mgmt-search.component';

@NgModule({
    imports: [
        CommonModule,
        EmployeeManagementRoutingModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PluginsModule
    ],
    providers: [EmployeeManagementService,
        CommonUtilService],
    declarations: [
        EmployeeManagementComponent,
        EmpMgmtModalComponent,
        EmpMgmtSearchComponent
    ],
    entryComponents: [
        EmpMgmtModalComponent
    ]
})
export class EmployeeManagementModule {
}
