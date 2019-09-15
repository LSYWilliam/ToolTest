import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TerminalInformationComponent} from "./component/terminal-information.component";

const routes: Routes = [
    {
        path: '',
        component: TerminalInformationComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class TerminalInformationRoutingModule { }
