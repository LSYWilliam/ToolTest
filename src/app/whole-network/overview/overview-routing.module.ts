import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OverviewComponent} from "./component/overview.component";


const routes: Routes = [
    {
        path: '',
        component: OverviewComponent,
        data: { title: 'Dashboard' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OverviewRoutingModule {}
