import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FirmwareManagementPlatformComponent} from './component/firmware-management-platform.component';
import {DeviceTypeResolverService} from "../../../shared/service/device-type-resolver.service";
import {DeviceModelResolverService} from "../../../shared/service/device-model-resolver.service";
import {SwitchDeviceModelResolverService} from "../../../shared/service/switch-device-model-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: FirmwareManagementPlatformComponent,
        resolve: {
            deviceType: DeviceTypeResolverService,
            deviceModel: DeviceModelResolverService,
            switchDeviceModel: SwitchDeviceModelResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        DeviceTypeResolverService,
        DeviceModelResolverService,
        SwitchDeviceModelResolverService
    ]
})
export class FirmwareManagementPlatformRoutingModule {
}
