import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OnlineUsersComponent} from "./component/online-users.component";

const routes: Routes = [
    {
        path: '',
        component: OnlineUsersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class OnlineUsersRoutingModule { }
