import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartmentManagementRoutingModule} from "./department-management-routing.module";
import {DepartmentManagementComponent} from "./component/department-management.component";
import {DepartmentManagementService} from "./service/department-management.service";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {DeptMgmtInfoModalComponent} from "./component/dept-mgmt-info-modal/dept-mgmt-info-modal.component";
import {DeptMgmtInfoDropTreeComponent} from "./component/dept-mgmt-info-drop-tree/dept-mgmt-info-drop-tree.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

@NgModule({
    imports: [
        CommonModule,
        DepartmentManagementRoutingModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PluginsModule
    ],
    providers: [
        DepartmentManagementService,
        CommonUtilService
    ],
    exports:[
        DepartmentManagementComponent,
        DeptMgmtInfoModalComponent,
        DeptMgmtInfoDropTreeComponent
    ],
    declarations: [
        DepartmentManagementComponent,
        DeptMgmtInfoModalComponent,
        DeptMgmtInfoDropTreeComponent
    ],
    entryComponents: [
        DeptMgmtInfoModalComponent
    ]
})
export class DepartmentManagementModule {
}
