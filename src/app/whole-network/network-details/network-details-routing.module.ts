import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkDetailsComponent } from './component/network-details.component';
import { FloorResolverService } from "../../shared/service/floor-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: NetworkDetailsComponent,
        resolve: { networkFloorList: FloorResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [FloorResolverService]
})
export class NetworkDetailsRoutingModule {}
