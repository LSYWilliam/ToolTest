import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {AdapterGroupRegisterComponent} from "./component/adapter-group-register.component";

const routes: Routes = [
    {
        path: '',
        component: AdapterGroupRegisterComponent
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
export class AdapterGroupRegisterRoutingModule { }
