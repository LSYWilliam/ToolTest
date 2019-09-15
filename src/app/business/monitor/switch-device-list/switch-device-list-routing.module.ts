import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessResolverService} from "../../../shared/service/business-resolver.service";
import {SwitchDeviceListComponent} from "./component/switch-device-list.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: SwitchDeviceListComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BusinessResolverService]
})
export class SwitchDeviceListRoutingModule {}
