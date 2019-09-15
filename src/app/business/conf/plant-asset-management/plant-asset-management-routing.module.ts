import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlantAssetManagementComponent} from "./component/plant-asset-management.component";
import {BusinessResolverService} from "../../../shared/service/business-resolver.service";



const routes: Routes = [
    {
        path: '',
        component: PlantAssetManagementComponent,
        resolve: { businessList: BusinessResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BusinessResolverService]
})
export class PlantAssetManagementRoutingModule {}
