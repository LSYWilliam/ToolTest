import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OnlineClientManagementComponent} from "./component/online-client-management.component";
import {CommonUtilService} from "../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: OnlineClientManagementComponent,
        // resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class OnlineClientManagementRoutingModule {}
