import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";
import {EquipmentAssetManagementRoutingModule} from "./equipment-asset-management-routing.module";
import {EquipmentAssetManagementService} from "./service/equipment-asset-management.service";
import {EquipmentAssetManagementComponent} from "./commponent/equipment-asset-management.component";
import {EquipmentAssetModalComponent} from "./commponent/equipment-asset-modal/equipment-asset-modal.component";
import {AssetDetailsModalComponent} from "./commponent/asset-details-modal/asset-details-modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        EquipmentAssetManagementRoutingModule
    ],
    providers: [EquipmentAssetManagementService],
    declarations: [ EquipmentAssetManagementComponent, EquipmentAssetModalComponent, AssetDetailsModalComponent ],
    entryComponents: [EquipmentAssetModalComponent, AssetDetailsModalComponent]
})

export class EquipmentAssetManagementModule { }
