import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RoleManagementComponent} from "./component/role-management.component";

import {LogResolverService} from "../../../../shared/service/LogResolve.service";

const routes: Routes = [
    {
        path: '',
        component: RoleManagementComponent,
        /* data: { title: 'Dashboard' }, */
        resolve: { role: LogResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        LogResolverService
    ]
})
export class RoleManagementRoutingModule {}
