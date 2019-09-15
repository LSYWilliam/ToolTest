import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ApDetailsComponent} from "./component/ap-details.component";


const routes: Routes = [
    {
        path: '',
        component: ApDetailsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApDetailsRoutingModule {}
