import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticateUserListComponent} from "./commponent/authenticate-user-list.component";

const routes: Routes = [
    {
        path: '',
        component: AuthenticateUserListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthenticateUserListRoutingModule {}
