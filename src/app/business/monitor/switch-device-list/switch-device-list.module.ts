import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";
import {SwitchDeviceListRoutingModule} from "./switch-device-list-routing.module";
import {SwitchDeviceListService} from "./service/switch-device-list.service";
import {SwitchDeviceListComponent} from "./component/switch-device-list.component";
import {SwitchDeviceListModalComponent} from "./component/switch-modal/switch-device-list-modal.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        SwitchDeviceListRoutingModule
    ],
    providers: [SwitchDeviceListService,NetworkResolverService],
    declarations: [ SwitchDeviceListComponent, SwitchDeviceListModalComponent ],
    entryComponents: [SwitchDeviceListModalComponent]
})

export class SwitchDeviceListModule { }
