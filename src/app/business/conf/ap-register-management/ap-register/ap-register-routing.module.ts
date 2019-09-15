import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApRegisterComponent} from "./component/ap-register.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: ApRegisterComponent
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
export class ApRegisterRoutingModule { }
