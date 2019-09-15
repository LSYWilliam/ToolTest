import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ApListComponent} from "./component/ap-list.component";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: ApListComponent,
        resolve: { networkList: NetworkResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NetworkResolverService]
})
export class ApListRoutingModule {}
