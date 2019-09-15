import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineStaffComponent} from "./component/online-staff.component";
import {OnlineStaffResolverService} from "../../../../shared/service/online-staff-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: OnlineStaffComponent,
        resolve: { onlineUsersData: OnlineStaffResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        OnlineStaffResolverService
    ]
})
export class OnlineStaffRoutingModule {}
