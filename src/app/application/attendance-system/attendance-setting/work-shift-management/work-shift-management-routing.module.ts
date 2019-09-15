import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WorkShiftManagementComponent} from "./component/work-shift-management.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: WorkShiftManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class WorkShiftManagementRoutingModule { }
