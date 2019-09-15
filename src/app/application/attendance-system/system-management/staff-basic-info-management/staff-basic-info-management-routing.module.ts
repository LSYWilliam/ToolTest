import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StaffBasicInfoManagementComponent} from "./component/staff-basic-info-management.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: StaffBasicInfoManagementComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class StaffBasicInfoManagementRoutingModule { }
