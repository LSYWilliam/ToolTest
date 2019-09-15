import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RadioFrequencyManagementComponent} from "./component/radio-frequency-management.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: RadioFrequencyManagementComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class RadioFrequencyManagementRoutingModule {}
