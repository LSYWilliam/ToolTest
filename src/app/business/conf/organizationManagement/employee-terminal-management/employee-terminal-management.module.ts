import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeTerminalManagementRoutingModule} from "./employee-terminal-management-routing.module";
import {EmployeeTerminalManagementService} from "./service/employee-terminal-management.service";
import {EmployeeTerminalManagementComponent} from "./component/employee-terminal-management.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmpTerminalMgmtModalComponent} from './component/emp-terminal-mgmt-modal/emp-terminal-mgmt-modal.component';
import {PluginsModule} from "../../../../plugins/plugins.module";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import { EmpTerminalMgmtSearchComponent } from './component/emp-terminal-mgmt-search/emp-terminal-mgmt-search.component';

@NgModule({
    imports: [
        CommonModule,
        EmployeeTerminalManagementRoutingModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PluginsModule
    ],
    providers: [
        EmployeeTerminalManagementService,
        CommonUtilService
    ],
    declarations: [
        EmployeeTerminalManagementComponent,
        EmpTerminalMgmtModalComponent,
        EmpTerminalMgmtSearchComponent
    ],
    entryComponents: [
        EmpTerminalMgmtModalComponent
    ]
})
export class EmployeeTerminalManagementModule {
}
