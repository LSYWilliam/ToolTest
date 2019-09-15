import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BusinessListComponent} from "./component/business-list.component";
import {AdapterGroupListResolverService} from "../../../../shared/service/adapter-group-list-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: BusinessListComponent,
        resolve: { adapterGroupList: AdapterGroupListResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BusinessListRoutingModule {}
