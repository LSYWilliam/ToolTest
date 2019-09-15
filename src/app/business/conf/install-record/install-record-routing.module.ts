import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstallRecordComponent} from './component/install-record.component';


const routes: Routes = [
    {
        path: '',
        component: InstallRecordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class InstallRecordRoutingModule {}
