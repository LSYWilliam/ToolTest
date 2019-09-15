import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AttndGroupManagementComponent} from './component/attnd-group-management.component';
import {WorkShiftResolveService} from "../../../../shared/service/work-shift-resolve.service";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: AttndGroupManagementComponent,
        resolve: { workShiftList: WorkShiftResolveService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        WorkShiftResolveService,
        CommonUtilService
    ]
})
export class AttndGroupManagementRoutingModule {}
