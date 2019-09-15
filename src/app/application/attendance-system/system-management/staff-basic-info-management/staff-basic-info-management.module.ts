import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffBasicInfoManagementRoutingModule} from "./staff-basic-info-management-routing.module";
import {StaffBasicInfoManagementComponent} from "./component/staff-basic-info-management.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SharedModule} from "../../../../shared/shared.module";
import { StaffBasicInfoModalComponent } from './component/staff-basic-info-modal/staff-basic-info-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        StaffBasicInfoManagementRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        StaffBasicInfoManagementComponent,
        StaffBasicInfoModalComponent
    ],
    entryComponents: [
        StaffBasicInfoModalComponent
    ]
})
export class StaffBasicInfoManagementModule {
}
