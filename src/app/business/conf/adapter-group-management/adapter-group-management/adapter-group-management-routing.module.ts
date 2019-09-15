import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {AdapterGroupManagementComponent} from "./component/adapter-group-management.component";

const routes: Routes = [
    {
        path: '',
        component: AdapterGroupManagementComponent
        // resolve: { threeLinkList: ThreeLinkageResolveService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class AdapterGroupManagementRoutingModule { }
