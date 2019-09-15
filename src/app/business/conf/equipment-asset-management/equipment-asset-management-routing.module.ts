import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentAssetManagementComponent} from "./commponent/equipment-asset-management.component";
const routes: Routes = [
    {
        path: '',
        component: EquipmentAssetManagementComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class EquipmentAssetManagementRoutingModule {}
