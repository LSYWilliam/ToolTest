import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProbeConfComponent} from "./component/probe-conf.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: ProbeConfComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class ProbeConfRoutingModule {}
