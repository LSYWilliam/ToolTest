import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";
import {PlantAssetManagementRoutingModule} from "./plant-asset-management-routing.module";
import {PlantAssetManagementComponent} from "./component/plant-asset-management.component";
import {PlantAssetManagementService} from "./service/plant-asset-management.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        PlantAssetManagementRoutingModule
    ],
    providers: [PlantAssetManagementService],
    declarations: [ PlantAssetManagementComponent ],
    entryComponents: []
})

export class PlantAssetManagementModule { }
