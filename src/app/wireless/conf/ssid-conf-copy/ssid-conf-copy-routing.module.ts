import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SsidConfCopyComponent} from "./component/ssid-conf-copy.component";
import {PortalServiceListResolverService} from "../../../shared/service/portalService-resolver.service";
import {RadiusServiceResolverService} from "../../../shared/service/radiusService-resolver.service";
const routes: Routes = [
    {
        path: '',
        component: SsidConfCopyComponent,
        resolve: { portalServiceList: PortalServiceListResolverService,radiusServiceList: RadiusServiceResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [PortalServiceListResolverService,RadiusServiceResolverService]
})
export class SsidConfCopyRoutingModule {}
