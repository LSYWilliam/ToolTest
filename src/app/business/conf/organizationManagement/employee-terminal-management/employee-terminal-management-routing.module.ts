import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeTerminalManagementComponent} from "./component/employee-terminal-management.component";

const routes: Routes = [
    {
        path: '',
        component: EmployeeTerminalManagementComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeTerminalManagementRoutingModule { }
