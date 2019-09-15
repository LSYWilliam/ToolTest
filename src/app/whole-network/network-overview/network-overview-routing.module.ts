import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkOverviewComponent} from "./component/network-overview.component";


const routes: Routes = [
    {
        path: '',
        component: NetworkOverviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NetworkOverviewRoutingModule {}
