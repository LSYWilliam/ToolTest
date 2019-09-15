import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {NetworkManagementComponent} from "./component/network-management.component";
import { NetworkManagementRoutingModule } from "./network-management-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NetworkManagementService} from "./service/network-management.service";
import {NetworkManagerModalComponent} from "./component/network-manager-modal/network-manager-modal.component";
import {ThreeLinkComponent} from "./component/three-link/three-link.component";



@NgModule({
    imports: [
        CommonModule,
        NetworkManagementRoutingModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        PluginsModule,
        SharedModule
    ],
    providers: [NetworkManagementService],
    declarations: [ NetworkManagementComponent, NetworkManagerModalComponent, ThreeLinkComponent],
    entryComponents: [NetworkManagerModalComponent, ThreeLinkComponent]
})

export class NetworkManagementModule { }
