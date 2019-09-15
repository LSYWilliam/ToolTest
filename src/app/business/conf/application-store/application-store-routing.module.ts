import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApplicationStoreComponent} from "./component/application-store.component";
import {CommonUtilService} from "../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: ApplicationStoreComponent
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
export class ApplicationStoreRoutingModule { }
