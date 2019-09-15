import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SsidDetailsComponent} from "./component/ssid-details.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: SsidDetailsComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class SsidDetailsRoutingModule {}
