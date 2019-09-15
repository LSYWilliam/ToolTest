import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonUtilService} from "../../../shared/service/common-util.service";
import {LogManagementComponent} from "./component/log-management.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: LogManagementComponent,
        resolve: {networkList: NetworkResolverService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class LogManagementRoutingModule {
}
