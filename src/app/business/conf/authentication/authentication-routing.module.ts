import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationComponent} from "./component/authentication.component";


const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        data: { title: 'Dashboard' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
