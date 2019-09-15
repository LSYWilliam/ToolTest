import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessNetworkListComponent} from "./commponent/business-network-list.component";

const routes: Routes = [
    {
        path: '',
        component: BusinessNetworkListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BusinessNetworkListRoutingModule {}
