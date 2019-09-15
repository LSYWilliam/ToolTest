import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {VisitorCertificationRecordComponent} from "./component/visitor-certification-record.component";

const routes: Routes = [
    {
        path: '',
        component: VisitorCertificationRecordComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitorCertificationRecordRoutingModule { }
