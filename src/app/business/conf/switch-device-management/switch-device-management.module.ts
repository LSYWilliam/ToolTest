import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";
import {SwitchDeviceManagementRoutingModule} from "./switch-device-management-routing.module";
import {SwitchDeviceManagementComponent} from "./component/switch-device-management.component";
import {SwitchDeviceManagementService} from "./service/switch-device-management.service";
import {SwitchDeviceModalComponent} from "./component/switch-modal/switch-device-modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        SwitchDeviceManagementRoutingModule
    ],
    providers: [SwitchDeviceManagementService],
    declarations: [ SwitchDeviceManagementComponent, SwitchDeviceModalComponent ],
    entryComponents: [SwitchDeviceModalComponent]
})

export class SwitchDeviceManagementModule { }
