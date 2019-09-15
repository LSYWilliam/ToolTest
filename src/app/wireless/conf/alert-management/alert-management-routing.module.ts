import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AlertManagementComponent} from "./component/alert-management.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: AlertManagementComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class AlertManagementRoutingModule {}
