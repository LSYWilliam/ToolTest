import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdapterManagementComponent} from "./component/adapter-management.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: AdapterManagementComponent
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
export class AdapterManagementRoutingModule { }
