import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SsidDetailsCopyComponent} from "./component/ssid-details-copy.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: SsidDetailsCopyComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class SsidDetailsCopyRoutingModule {}
