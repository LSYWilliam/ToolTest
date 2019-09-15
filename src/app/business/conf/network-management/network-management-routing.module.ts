import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkManagementComponent} from "./component/network-management.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: NetworkManagementComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [NetworkResolverService],
    exports: [RouterModule]
})
export class NetworkManagementRoutingModule {}
