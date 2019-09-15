import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BlackWhiteListComponent} from "./component/black-white-list.component";


const routes: Routes = [
    {
        path: '',
        component: BlackWhiteListComponent,
        data: { title: 'Dashboard' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlackWhiteListRoutingModule {}
