import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../../plugins/plugins.module";
import { SharedModule } from "../../../../shared/shared.module";

import {BusinessNetworkListService} from "./service/business-network-list.service";

import {BusinessNetworkListComponent} from "./commponent/business-network-list.component";
import {BusinessNetworkListRoutingModule} from "./business-network-list-routing.module";
import {ThreeLinkComponent} from "./commponent/three-link/three-link.component";
import {BusinessListModalComponent} from "./commponent/business-list-modal/business-list-modal.component";
import {AssetDetailsModalComponent} from "./commponent/asset-details-modal/asset-details-modal.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        BusinessNetworkListRoutingModule
    ],
    providers: [BusinessNetworkListService],
    declarations: [
        BusinessNetworkListComponent,
        BusinessListModalComponent,
        AssetDetailsModalComponent,
        ThreeLinkComponent
    ],
    entryComponents: [
        BusinessListModalComponent,
        AssetDetailsModalComponent,
        ThreeLinkComponent
    ]
})

export class BusinessNetworkListModule { }
