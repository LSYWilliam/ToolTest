import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BusinessInformationComponent} from "./component/business-information.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BusinessInformationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessInformationRoutingModule {}
