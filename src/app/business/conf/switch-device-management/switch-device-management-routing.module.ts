import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SwitchDeviceManagementComponent} from "./component/switch-device-management.component";
import {BusinessResolverService} from "../../../shared/service/business-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: SwitchDeviceManagementComponent,
        resolve: { businessList: BusinessResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BusinessResolverService]
})
export class SwitchDeviceManagementRoutingModule {}
