import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeptBasicInfoManagementComponent} from "./component/dept-basic-info-management.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: DeptBasicInfoManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class DeptBasicInfoManagementRoutingModule {}
